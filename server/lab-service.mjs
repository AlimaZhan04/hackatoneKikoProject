import express from 'express';
import { app } from './app.mjs';
import { migrate } from './migrate.mjs';
import { pool } from './db.mjs';
await migrate();
const service=express();
service.get('/',(req,res)=>res.redirect('/lab/'));
service.use(app);
const port=Number(process.env.LAB_PORT||3003);
const server=service.listen(port,'127.0.0.1',error=>{
 if(error){console.error(error.message);pool.end().finally(()=>process.exit(1));return;}
 console.log(`KIKO Architecture Lab http://localhost:${port}`);
});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(async()=>{await pool.end();process.exit(0);}));
