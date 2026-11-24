import { Router } from 'express';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { labNodes } from '../../shared/lab-model.mjs';
import { pool } from '../db.mjs';
export const labRoutes=Router();
const sources=new Map(labNodes.map(node=>[node.id,node.file]));
labRoutes.get('/source/:id',async(req,res)=>{
 const path=sources.get(req.params.id);
 if(!path)return res.status(404).json({message:'Модуль не найден.'});
 const code=await readFile(fileURLToPath(new URL('../../'+path,import.meta.url)),'utf8');
 res.json({path,code});
});
labRoutes.get('/status',async(req,res)=>{
 const result=await pool.query('SELECT current_database() AS name, (SELECT count(*)::int FROM products) AS products');
 res.json({database:'PostgreSQL',name:result.rows[0].name,products:result.rows[0].products,tables:['products','users','sessions','newsletter_subscriptions']});
});
