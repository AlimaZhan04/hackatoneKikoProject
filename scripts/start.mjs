import { spawn } from 'node:child_process';
const build=spawn(process.execPath,['node_modules/vite/bin/vite.js','build'],{stdio:'inherit'});
build.on('error',error=>{console.error(error);process.exitCode=1;});
build.on('exit',code=>{
 if(code){process.exitCode=code;return;}
 const server=spawn(process.execPath,['--env-file=.env','server/index.mjs'],{stdio:'inherit'});
 server.on('exit',code=>{process.exitCode=code||0;});
 server.on('error',error=>{console.error(error);process.exitCode=1;});
 process.on('SIGINT',()=>server.kill());process.on('SIGTERM',()=>server.kill());
});
