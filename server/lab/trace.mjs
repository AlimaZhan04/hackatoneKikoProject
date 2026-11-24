import { AsyncLocalStorage } from 'node:async_hooks';
const storage=new AsyncLocalStorage();
export function markLab(module,action){const steps=storage.getStore();if(steps)steps.push({module,action});}
// Только названия этапов: без паролей, cookie, значений товара или реквизитов БД.
export function labTrace(req,res,next){
 if(req.get('X-Kiko-Lab')!=='1')return next();
 const steps=[{module:'routes',action:`${req.method} /api/cosmetics`}];
 const end=res.end;
 res.end=function(...args){if(!res.headersSent)res.setHeader('X-Kiko-Lab-Trace',Buffer.from(JSON.stringify({steps,status:res.statusCode})).toString('base64url'));return end.apply(this,args);};
 storage.run(steps,next);
}
