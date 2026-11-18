import { app } from './app.mjs';
import { migrate } from './migrate.mjs';
import { pool } from './db.mjs';
await migrate();
const server = app.listen(Number(process.env.PORT || 3001), '127.0.0.1', error => {
  if(error){console.error(error.message);pool.end().finally(()=>process.exit(1));return;}
  console.log('KIKO http://localhost:' + (process.env.PORT || 3001));
});
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => server.close(async () => { await pool.end(); process.exit(0); }));
