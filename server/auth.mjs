import { Router } from 'express';
import { randomBytes, scrypt, timingSafeEqual,createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { pool } from './db.mjs';
const derive=promisify(scrypt);
const hashToken=token=>createHash('sha256').update(token).digest('hex');
export async function hashPassword(password) {const salt=randomBytes(16).toString('hex');return salt+':'+(await derive(password,salt,64)).toString('hex');}
async function checkPassword(password,stored) {const [salt,hash]=stored.split(':');return timingSafeEqual(Buffer.from(hash,'hex'),await derive(password,salt,64));}
export async function currentUser(req) {
  const token=req.headers.cookie?.split(';').map(x=>x.trim()).find(x=>x.startsWith('kiko_session='))?.slice(13);
  if(!token)return null;
  return (await pool.query('SELECT u.id,u.email,u.role FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token_hash=$1 AND s.expires_at>now()',[hashToken(token)])).rows[0]||null;
}
export async function requireAdmin(req,res,next) {const user=await currentUser(req);if(user?.role!=='admin')return res.status(403).json({message:'Войдите под учётной записью администратора.'});next();}
async function session(res,user) {const token=randomBytes(32).toString('hex');await pool.query("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES($1,$2,now()+interval '7 days')",[hashToken(token),user.id]);res.cookie('kiko_session',token,{httpOnly:true,sameSite:'strict',maxAge:7*86400000,path:'/'});return {id:user.id,email:user.email,role:user.role};}
export const authRoutes=Router();
authRoutes.get('/me',async(req,res)=>res.json({user:await currentUser(req)}));
authRoutes.post('/register',async(req,res)=>{
  const {email,password}=req.body||{};
  if(typeof email!=='string'||!/^\S+@\S+\.\S+$/.test(email)||email.length>254||typeof password!=='string'||password.length<8||password.length>128)return res.status(422).json({message:'Укажите корректный email и пароль от 8 до 128 символов.'});
  try{const user=(await pool.query('INSERT INTO users(email,password_hash) VALUES($1,$2) RETURNING id,email,role',[email.trim().toLowerCase(),await hashPassword(password)])).rows[0];res.status(201).json({user:await session(res,user)});}
  catch(e){if(e.code==='23505')return res.status(409).json({message:'Этот email уже зарегистрирован.'});throw e;}
});
authRoutes.post('/login',async(req,res)=>{
  const {email,password}=req.body||{};
  if(typeof email!=='string'||typeof password!=='string'||password.length>128)return res.status(422).json({message:'Укажите email и пароль.'});
  const user=(await pool.query('SELECT * FROM users WHERE email=$1',[email.trim().toLowerCase()])).rows[0];
  if(!user||!await checkPassword(password,user.password_hash))return res.status(401).json({message:'Неверный email или пароль.'});
  res.json({user:await session(res,user)});
});
authRoutes.post('/logout',async(req,res)=>{const token=req.headers.cookie?.split(';').map(x=>x.trim()).find(x=>x.startsWith('kiko_session='))?.slice(13);if(token)await pool.query('DELETE FROM sessions WHERE token_hash=$1',[hashToken(token)]);res.clearCookie('kiko_session',{path:'/'}).status(204).end();});
