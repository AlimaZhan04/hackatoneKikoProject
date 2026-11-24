// method выбирает действие клиента — сцепление по управлению по терминологии лекции.
export async function request(path,{method='GET',body,onTrace}={}){
 const isFile=body instanceof FormData;
 const response=await fetch('/api'+path,{method,cache:'no-store',headers:{...(path.startsWith('/cosmetics')?{'X-Kiko-Lab':'1'}:{}),...(!isFile&&body?{'Content-Type':'application/json'}:{})},...(body?{body:isFile?body:JSON.stringify(body)}:{})});
 const encoded=response.headers.get('X-Kiko-Lab-Trace');
 if(encoded&&onTrace){try{onTrace(JSON.parse(atob(encoded.replace(/-/g,'+').replace(/_/g,'/'))));}catch{}}
 const data=response.status===204?null:await response.json();
 if(!response.ok)throw Object.assign(new Error(data?.message||'Запрос не выполнен.'),{status:response.status,errors:data?.errors});
 return data;
}
