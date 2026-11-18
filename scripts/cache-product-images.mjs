import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const {cosmetics}=JSON.parse(await readFile(new URL('../db.json',import.meta.url),'utf8'));
await mkdir(new URL('../public/images/products/',import.meta.url),{recursive:true});
const entries=[...new Set(cosmetics.map(p=>p.image).filter(Boolean))],mapping={};
for(let start=0;start<entries.length;start+=3)await Promise.all(entries.slice(start,start+3).map(async url=>{
 try{
  const response=await fetch(url,{signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw new Error('HTTP '+response.status);
  const mime=response.headers.get('content-type')||'',ext=mime.includes('webp')?'webp':mime.includes('png')?'png':mime.includes('jpeg')?'jpg':null;
  if(!ext)throw new Error('Not a supported image');
  const filename=createHash('sha256').update(url).digest('hex').slice(0,16)+'.'+ext;
  await writeFile(new URL('../public/images/products/'+filename,import.meta.url),Buffer.from(await response.arrayBuffer()));
  mapping[url]='/images/products/'+filename;
 }catch{mapping[url]='/images/product-placeholder.svg';}
}));
await writeFile(new URL('../src/helpers/product-assets.json',import.meta.url),JSON.stringify(mapping,null,2)+'\n');
console.log('Cached:',Object.values(mapping).filter(v=>!v.endsWith('.svg')).length,'; unavailable originals:',Object.values(mapping).filter(v=>v.endsWith('.svg')).length);
