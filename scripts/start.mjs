import { spawn } from 'node:child_process';
const build=spawn(process.execPath,['node_modules/vite/bin/vite.js','build'],{stdio:'inherit'});
build.on('error',error=>{console.error(error);process.exitCode=1;});
build.on('exit',code=>{
 if(code){process.exitCode=code;return;}
 const children=['server/index.mjs','server/lab-service.mjs'].map(path=>spawn(process.execPath,['--env-file=.env',path],{stdio:'inherit'}));
 let stopping=false;
 const stop=()=>{stopping=true;for(const child of children)child.kill();};
 for(const child of children){child.on('exit',code=>{if(!stopping){process.exitCode=code||0;stop();}});child.on('error',error=>{console.error(error);process.exitCode=1;stop();});}
 process.on('SIGINT',stop);process.on('SIGTERM',stop);
});
