import React,{useCallback,useEffect,useRef,useState} from 'react';
import { labNodes,labEdges,badNodes,badEdges,cohesionTypes,couplingTypes } from '../../shared/lab-model.mjs';
import { validateProduct } from '../../shared/product-validation.mjs';
import { filterProducts,summarizeProducts } from '../studio/catalog.mjs';
import { submitProduct } from '../studio/submit-product.mjs';
import { request } from './client.mjs';

const sections=[['schema','Схема модулей'],['experiments','Опыты'],['catalog','Каталог и CRUD'],['reference','Справочник']];
const money=value=>new Intl.NumberFormat('ru-RU',{style:'currency',currency:'USD'}).format(value);
const initialProduct={name:'',description:'',price:'',type:'decorative',image:''};

function Graph({bad,selected,onSelect,filter,active}){
 const nodes=bad?badNodes:labNodes,edges=bad?badEdges:labEdges;
 const [zoom,setZoom]=useState(1);
 const connected=new Set(edges.filter(e=>e.id===selected||e.from===selected||e.to===selected).flatMap(e=>[e.from,e.to]));
 const lines=edges.map(edge=>{
  const from=nodes.find(n=>n.id===edge.from),to=nodes.find(n=>n.id===edge.to),backwards=to.x<from.x;
  const x1=from.x+(backwards?0:182),y1=from.y+40,x2=to.x+(backwards?182:0),y2=to.y+40;
  const shift=edge.id==='routes-stamp'?26:edge.id==='routes-data'?-12:0,bend=Math.min(160,Math.max(25,Math.abs(x2-x1)*.45));
  return {...edge,d:`M ${x1} ${y1+shift} C ${x1+(backwards?-bend:bend)} ${y1+shift}, ${x2+(backwards?bend:-bend)} ${y2+shift}, ${x2} ${y2+shift}`,x:(x1+x2)/2,y:(y1+y2)/2+shift,dim:filter!=='all'&&edge.type!==filter,related:selected===edge.from||selected===edge.to||selected===edge.id};
 });
 return <section className="lab-graph-panel" aria-label="Интерактивная схема модулей">
  <div className="lab-graph-title"><span>{bad?'Учебный антипаттерн':'Карта модулей KIKO'}</span><div className="lab-zoom"><button aria-label="Уменьшить схему" onClick={()=>setZoom(z=>Math.max(.8,z-.15))}>−</button><button onClick={()=>setZoom(1)}>100%</button><button aria-label="Увеличить схему" onClick={()=>setZoom(z=>Math.min(1.6,z+.15))}>+</button></div></div>
  <div className="lab-graph-scroll" tabIndex={0} aria-label="Область схемы, доступна прокрутка">
   <svg className="lab-graph" viewBox="0 0 1120 620" style={{width:`${zoom*100}%`,minWidth:zoom*860}} aria-label={bad?'Вымышленный монолит для сравнения':'Модули интерфейса, API и PostgreSQL; выберите узел или стрелку'}>
    <defs>{Object.entries(couplingTypes).map(([id,type])=><marker key={id} id={`arrow-${id}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={type.color}/></marker>)}</defs>
    {lines.map(edge=><g key={edge.id} className={`lab-edge ${edge.dim?'dim':''} ${edge.related?'related':''} ${selected===edge.id?'selected':''}`} onClick={()=>onSelect(edge.id)}><path className="lab-edge-hit" d={edge.d}/><path className="lab-edge-line" d={edge.d} stroke={couplingTypes[edge.type].color} markerEnd={`url(#arrow-${edge.type})`}/></g>)}
    {/* Все метки поверх линий: соседняя стрелка не перехватывает нажатие. */}
    {lines.map(edge=><g key={'marker-'+edge.id} className={`lab-edge-marker ${edge.dim?'dim':''}`} role="button" tabIndex={edge.dim?-1:0} aria-label={`Связь: ${edge.label}`} aria-pressed={selected===edge.id} onClick={()=>onSelect(edge.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(edge.id);}}}><circle cx={edge.x} cy={edge.y} r={selected===edge.id?13:11} fill={couplingTypes[edge.type].color}/><text className="lab-edge-score" x={edge.x} y={edge.y+4}>{couplingTypes[edge.type].score??'•'}</text></g>)}
    {nodes.map(node=>{
     const type=cohesionTypes[node.type],isSelected=selected===node.id,isActive=active===node.id;
     return <g key={node.id} transform={`translate(${node.x} ${node.y})`} role="button" tabIndex={0} aria-label={`Модуль ${node.title}`} aria-pressed={isSelected} onClick={()=>onSelect(node.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(node.id);}}} className={`lab-node ${isSelected?'selected':''} ${isActive?'active':''} ${connected.has(node.id)?'connected':''}`} style={{'--node-color':type?.color||'#9eb0c7'}}>
      <rect width="182" height="80" rx="12"/><rect className="lab-node-stripe" x="1" y="12" width="3" height="56" rx="1"/>
      <text className="lab-node-title" x="14" y="29">{node.title}</text><text className="lab-node-sub" x="14" y="49">{node.sub}</text>
      <text className="lab-node-type" x="14" y="67">{type?`${type.name} · СС ${type.score}`:node.id==='monolith'?'Смешение обязанностей':'Выбрать модуль →'}</text>
     </g>;
    })}
   </svg>
  </div>
  <div className="lab-graph-caption"><span className="lab-dot"/> {bad?'Вымышленный пример: не меняет код и базу магазина.':'Схема составлена по исходникам. Число на стрелке — СЦ; число в модуле — СС.'}</div>
 </section>;
}

function Inspector({selected,bad,onSelect,onSource}){
 const nodes=bad?badNodes:labNodes,edges=bad?badEdges:labEdges;
 const node=nodes.find(n=>n.id===selected),edge=edges.find(e=>e.id===selected);
 if(edge){const type=couplingTypes[edge.type];return <aside className="lab-inspector">
  <div className="lab-eyebrow">Сцепление · между модулями</div><h2>{type.name}</h2><span className="lab-tag" style={{'--tag-color':type.color}}>{type.score===null?'Без числовой оценки':`СЦ ${type.score} · меньше — лучше`}</span>
  <p>{edge.why}</p><div className="lab-inspector-label">Контракт вызова</div><pre className="lab-code"><code>{edge.contract}</code></pre><p className="lab-muted">{type.why}</p>
  <div className="lab-inspector-label">Связанные модули</div>{[edge.from,edge.to].map(id=><button className="lab-related" key={id} onClick={()=>onSelect(id)}>{nodes.find(n=>n.id===id)?.title}<span>→</span></button>)}
 </aside>;}
 if(!node)return null;
 const type=cohesionTypes[node.type];
 return <aside className="lab-inspector">
  <div className="lab-eyebrow">{bad?'Сравнение · учебный пример':'Модуль · настоящий исходный код'}</div><h2>{node.title}</h2>
  {type?<span className="lab-tag" style={{'--tag-color':type.color}}>{type.name} · СС {type.score}/10</span>:<span className="lab-tag">{bad?'Антипаттерн':'Ответственность модуля'}</span>}
  <p>{type?.why||node.why}</p>
  {node.file&&<><div className="lab-inspector-label">Где находится</div><code className="lab-file">{node.file}</code><button className="lab-button lab-source-button" onClick={()=>onSource(node.id)}>Посмотреть код модуля ↗</button></>}
  <div className="lab-inspector-label">Что внутри</div><div className="lab-function-list">{node.functions.map(name=><span key={name}>{name}</span>)}</div>
  <div className="lab-inspector-label">Вызовы и зависимости</div>
  {edges.filter(e=>e.from===node.id||e.to===node.id).map(e=><button className="lab-related" key={e.id} onClick={()=>onSelect(e.id)}><span><i style={{background:couplingTypes[e.type].color}}/>{e.from===node.id?'→':'←'} {nodes.find(n=>n.id===(e.from===node.id?e.to:e.from))?.title}<small>{e.label}</small></span><span>{couplingTypes[e.type].score===null?'↗':`СЦ ${couplingTypes[e.type].score}`}</span></button>)}
 </aside>;
}

function Modal({title,onClose,children,wide=false}){
 const ref=useRef();
 useEffect(()=>{ref.current.showModal();},[]);
 return <dialog ref={ref} className={`lab-modal ${wide?'wide':''}`} onCancel={onClose} aria-label={title}><div className="lab-modal-heading"><h2>{title}</h2><button className="lab-button" onClick={onClose} aria-label="Закрыть окно">Закрыть ×</button></div>{children}</dialog>;
}

function Source({id,onClose}){
 const [data,setData]=useState(null),[error,setError]=useState('');
 useEffect(()=>{let current=true;request('/lab/source/'+id).then(data=>{if(current)setData(data);}).catch(e=>{if(current)setError(e.message);});return()=>{current=false;};},[id]);
 return <Modal title="Исходный код модуля" onClose={onClose} wide>{error?<p role="alert">{error}</p>:!data?<p role="status">Загружаем исходник…</p>:<><p className="lab-file">{data.path}</p><pre className="lab-source"><code>{data.code}</code></pre><p className="lab-muted">Файл читается с диска проекта. Это действующий код, а не картинка или фрагмент из отчёта.</p></>}</Modal>;
}

function Trace({trace,onReplay}){
 return <section className="lab-panel lab-trace"><div className="lab-section-heading"><div><div className="lab-eyebrow">Фактические этапы · от сервера</div><h2>Путь последнего запроса</h2></div>{trace&&onReplay&&<button className="lab-button" onClick={onReplay}>Показать на схеме →</button>}</div>
  {!trace?<p className="lab-muted">Откройте каталог или выполните CRUD. Здесь появятся этапы, отмеченные сервером при обработке запроса.</p>:<><p><code>{trace.method} {trace.path}</code> <span className={`lab-status ${trace.status>=400?'error':''}`}>HTTP {trace.status}</span></p><ol className="lab-trace-steps">{trace.steps.map((step,i)=><li key={i}><span>{i+1}</span><div><strong>{labNodes.find(n=>n.id===step.module)?.title||step.module}</strong><small>{step.action}</small></div></li>)}</ol><p className="lab-muted">Показаны только отмеченные этапы этого HTTP-запроса. Это не автоматическая трассировка всех вызовов JavaScript.</p></>}
 </section>;
}

function Experiments({products}){
 const [type,setType]=useState('functional'),[price,setPrice]=useState('-1'),[errors,setErrors]=useState(null),[query,setQuery]=useState(''),[fail,setFail]=useState(false),[steps,setSteps]=useState([]),[running,setRunning]=useState(false),[badSteps,setBadSteps]=useState([]);
 const summary=summarizeProducts(products),visible=filterProducts(products,query,'');
 const run=async()=>{
  setSteps([]);setRunning(true);
  const step=text=>setSteps(old=>[...old,text]);
  try{await submitProduct({record:step,persist:async()=>{await new Promise(r=>setTimeout(r,250));if(fail)throw Error('Учебный отказ записи');},refresh:async()=>{await new Promise(r=>setTimeout(r,250));},close:()=>step('Интерфейс: форма закрыта'),notify:step});}catch{step('Ошибка записи: форма осталась открытой');}finally{setRunning(false);}
 };
 return <><div className="lab-page-heading"><div className="lab-eyebrow">Лабораторная 1</div><h1>Связность внутри модуля</h1><p>Измените входные данные и посмотрите, какую задачу выполняет модуль.</p></div>
 <div className="lab-type-tabs" aria-label="Тип связности">{Object.entries(cohesionTypes).map(([id,t])=><button key={id} aria-pressed={type===id} className={type===id?'selected':''} onClick={()=>setType(id)}><span>{t.name}</span><small>СС {t.score}</small></button>)}</div>
 <div className="lab-experiment-grid"><section className="lab-panel"><span className="lab-tag" style={{'--tag-color':cohesionTypes[type].color}}>СС {cohesionTypes[type].score}/10</span><h2>{cohesionTypes[type].name} связность</h2><p>{cohesionTypes[type].why}</p>
 {type==='functional'&&<form onSubmit={e=>{e.preventDefault();setErrors(validateProduct({name:'Учебный товар',description:'',price,type:'care',image:''}));}}><label className="lab-field">Цена учебного товара<input value={price} onChange={e=>setPrice(e.target.value)} type="number" step="0.01"/></label><button className="lab-button primary" type="submit">Проверить данные</button><p className="lab-muted">Вызывается настоящий validateProduct. Ничего не записывается в БД.</p></form>}
 {type==='information'&&<><ol className="lab-pipeline">{['JPEG / PNG / WebP','Проверка содержимого sharp','Поворот, уменьшение, WebP','Транзакция: photo + image','Адрес фото в карточке'].map(t=><li key={t}>{t}</li>)}</ol><a className="lab-button primary" href="#catalog">Загрузить настоящее фото →</a></>}
 {type==='communication'&&<><label className="lab-field">Поиск в общей коллекции<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Например, lip"/></label><p>В таблице: <strong>{visible.length}</strong>. Всего в исходном массиве: <strong>{summary.total}</strong>.</p><p className="lab-muted">Поиск изменяет строки, а счётчики продолжают описывать всю коллекцию.</p></>}
 {type==='procedural'&&<><label className="lab-checkbox"><input type="checkbox" checked={fail} onChange={e=>setFail(e.target.checked)}/>Смоделировать отказ записи</label><button className="lab-button primary" onClick={run} disabled={running}>{running?'Выполняется…':'Запустить сценарий'}</button><p className="lab-muted">Настоящий submitProduct, учебные persist/refresh. Без записи в PostgreSQL.</p></>}
 </section><section className="lab-panel"><div className="lab-eyebrow">Наблюдаемый результат</div>
 {type==='functional'&&<><h2>Одна функция — одна цель</h2>{errors===null?<p className="lab-muted">Проверьте отрицательную цену, затем положительную.</p>:<><p className={Object.keys(errors).length?'lab-error':'lab-success'} role="status">{Object.keys(errors).length?'Данные отклонены. SQL не выполняется.':'Данные прошли проверку.'}</p><pre className="lab-code">{JSON.stringify(errors,null,2)}</pre></>}<code className="lab-file">shared/product-validation.mjs → validateProduct</code></>}
 {type==='information'&&<><h2>Результат этапа → следующий этап</h2><p>Обработчик не сохраняет произвольный файл: сначала проверяет реальное содержимое, затем создаёт WebP и передаёт готовые байты репозиторию.</p><code className="lab-file">product.photo.mjs → processProductPhoto → savePhoto</code><p className="lab-muted">Здесь показана схема. Реальная загрузка и подтверждение API находятся в «Каталог и CRUD».</p></>}
 {type==='communication'&&<><h2>Одни данные, разные результаты</h2><div className="lab-mini-stats">{[['Всего',summary.total],['Макияж',summary.decorative],['Уход',summary.care],['Аксессуары',summary.accessories]].map(([k,v])=><div key={k}><span>{k}</span><strong>{v}</strong></div>)}</div><div className="lab-result-list">{visible.slice(0,6).map(p=><p key={p.id}>{p.name}<span>{money(p.price)}</span></p>)}{!visible.length&&<p>Совпадений нет.</p>}</div><code className="lab-file">filterProducts и summarizeProducts</code></>}
 {type==='procedural'&&<><h2>Порядок имеет значение</h2><ol className="lab-ordered-result" aria-live="polite">{steps.map((s,i)=><li key={i}>{s}</li>)}</ol>{!steps.length&&<p className="lab-muted">Запустите сценарий с успешной записью и с отказом.</p>}<code className="lab-file">src/studio/submit-product.mjs</code></>}
 </section></div>
 <section className="lab-panel lab-comparison"><div className="lab-section-heading"><div><div className="lab-eyebrow">Учебное сравнение · без БД</div><h2>Почему нельзя закрывать форму раньше времени</h2></div><button className="lab-button" onClick={async()=>{setBadSteps(['Форма закрыта до ответа']);await Promise.resolve();setBadSteps(s=>[...s,'Запись отклонена','Пользователь потерял контекст ошибки']);}}>Запустить плохой порядок</button></div><div className="lab-compare-columns"><div><h3>Антипаттерн</h3><code>close(); await persist();</code><p>Переход уже выполнен, хотя запись ещё не подтверждена.</p>{badSteps.map(s=><p className="lab-error" key={s}>{s}</p>)}</div><div><h3>В проекте</h3><code>await persist(); await refresh(); close();</code><p>При отказе persist функция close не вызывается. Это проверяется опытом выше и модульным тестом.</p></div></div></section></>;
}

function Catalog({products,load,user,onLogin,onTrace,onNotice}){
 const [query,setQuery]=useState(''),[category,setCategory]=useState(''),[page,setPage]=useState(1),[editing,setEditing]=useState(null),[form,setForm]=useState(initialProduct),[errors,setErrors]=useState({}),[busy,setBusy]=useState(false),[remove,setRemove]=useState(null),[photoId,setPhotoId]=useState(''),[file,setFile]=useState(null);
 const photoInput=useRef(null);
 const filtered=filterProducts(products,query,category),summary=summarizeProducts(products),pages=Math.max(1,Math.ceil(filtered.length/8));
 useEffect(()=>setPage(1),[query,category]);
 useEffect(()=>setPage(p=>Math.min(p,pages)),[pages]);
 const api=(path,options)=>request(path,{...options,onTrace:trace=>onTrace({...trace,path:'/api'+path,method:options?.method||'GET'})});
 const edit=product=>{setForm(product?{...product}:initialProduct);setEditing(product?product.id:'new');setErrors({});};
 const save=async e=>{
  e.preventDefault();const invalid=validateProduct(form);setErrors(invalid);if(Object.keys(invalid).length)return;
  setBusy(true);
  try{await submitProduct({persist:()=>api('/cosmetics'+(editing==='new'?'':'/'+editing),{method:editing==='new'?'POST':'PUT',body:form}),refresh:()=>load({preserveTrace:true}),close:()=>setEditing(null),notify:onNotice,record:()=>{}});}catch(e){setErrors(e.errors||{form:e.message});}finally{setBusy(false);}
 };
 const upload=async e=>{e.preventDefault();if(!file||!photoId)return;setBusy(true);try{const body=new FormData();body.append('photo',file);await api(`/cosmetics/${photoId}/photo`,{method:'POST',body});await load({preserveTrace:true});setFile(null);if(photoInput.current)photoInput.current.value='';onNotice('Фото сохранено в PostgreSQL. Этапы обработки — в журнале ниже.');}catch(e){onNotice(e.message);}finally{setBusy(false);}};
 return <><div className="lab-page-heading"><div className="lab-eyebrow">Настоящие данные · общая БД с магазином</div><h1>Каталог и путь запроса</h1><p>Изменения здесь сразу доступны магазину. Для записи требуется учётная запись администратора.</p></div>
 <div className="lab-mini-stats four">{[['Все товары',summary.total,''],['Макияж',summary.decorative,'decorative'],['Уход',summary.care,'care'],['Аксессуары',summary.accessories,'accessories']].map(([name,count,id])=><button key={name} aria-pressed={category===id} onClick={()=>setCategory(id)}><span>{name}</span><strong>{count}</strong></button>)}</div>
 <section className="lab-panel"><div className="lab-catalog-toolbar"><label className="lab-field">Поиск товара<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Название или описание"/></label><button className="lab-button" onClick={()=>load().catch(e=>onNotice(e.message))}>Обновить</button><button className="lab-button primary" onClick={()=>user?.role==='admin'?edit(null):onLogin()}>Добавить товар</button></div>
 <div className="lab-table-wrap"><table className="lab-table"><thead><tr><th>ID</th><th>Название</th><th>Категория</th><th>Цена</th><th>Действия</th></tr></thead><tbody>{filtered.slice((page-1)*8,page*8).map(p=><tr key={p.id}><td>{p.id}</td><td><strong>{p.name}</strong>{p.image?.startsWith('/api/')&&<small>Фото хранится в БД</small>}</td><td>{{decorative:'Макияж',care:'Уход',accessories:'Аксессуары'}[p.type]}</td><td className="lab-nowrap">{money(p.price)}</td><td><div className="lab-row-actions"><button disabled={user?.role!=='admin'} onClick={()=>edit(p)}>Изменить</button><button disabled={user?.role!=='admin'} className="danger" onClick={()=>setRemove(p)}>Удалить</button></div></td></tr>)}</tbody></table>{!filtered.length&&<p className="lab-empty">Товары не найдены. Измените поиск или категорию.</p>}</div>
 <div className="lab-pagination"><span>Найдено {filtered.length} · страница {page} из {pages}</span><div><button className="lab-button" disabled={page===1} onClick={()=>setPage(p=>p-1)}>← Назад</button><button className="lab-button" disabled={page===pages} onClick={()=>setPage(p=>p+1)}>Далее →</button></div></div>
 {user?.role!=='admin'&&<p className="lab-muted">Каталог доступен для чтения. <button className="lab-text-button" onClick={onLogin}>Войти администратором</button>, чтобы показать запись в БД.</p>}</section>
 <section className="lab-panel"><div className="lab-eyebrow">Информационная связность · СС 9</div><h2>Загрузка фотографии</h2><p>Сначала создайте товар, затем привяжите файл к его ID. Байты WebP и адрес сохраняются в одной транзакции.</p><form className="lab-upload-form" onSubmit={upload}><label className="lab-field">Товар<select value={photoId} onChange={e=>setPhotoId(e.target.value)} required><option value="">Выберите товар</option>{products.map(p=><option key={p.id} value={p.id}>#{p.id} · {p.name}</option>)}</select></label><label className="lab-field">Фото JPEG, PNG или WebP<input ref={photoInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>setFile(e.target.files[0])} required disabled={user?.role!=='admin'}/></label><button className="lab-button primary" disabled={busy||!file||!photoId||user?.role!=='admin'}>Загрузить фото</button></form>{photoId&&products.find(p=>p.id===Number(photoId))?.image?.startsWith('/api/')&&<img className="lab-photo-preview" src={products.find(p=>p.id===Number(photoId)).image+'?v='+encodeURIComponent(products.find(p=>p.id===Number(photoId)).updated_at)} alt="Сохранённое фото товара"/>}</section>
 {editing!==null&&<Modal title={editing==='new'?'Новый товар':'Изменить товар'} onClose={()=>{if(!busy)setEditing(null);}}><form onSubmit={save} noValidate>{[['name','Название'],['description','Описание'],['price','Цена в долларах'],['image','Ссылка на изображение (необязательно)']].map(([key,label])=><label key={key} className="lab-field">{label}<input type={key==='price'?'number':'text'} step={key==='price'?'0.01':undefined} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} aria-invalid={!!errors[key]}/>{errors[key]&&<small className="lab-error">{errors[key]}</small>}</label>)}<label className="lab-field">Категория<select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}><option value="decorative">Макияж</option><option value="care">Уход</option><option value="accessories">Аксессуары</option></select></label>{errors.form&&<p role="alert" className="lab-error">{errors.form}</p>}<button className="lab-button primary" disabled={busy}>{busy?'Сохраняем…':'Сохранить товар'}</button></form></Modal>}
 {remove&&<Modal title="Удалить товар?" onClose={()=>{if(!busy)setRemove(null);}}><p>Товар «{remove.name}» будет удалён из общей базы магазина.</p><button className="lab-button danger" disabled={busy} onClick={async()=>{setBusy(true);try{await api('/cosmetics/'+remove.id,{method:'DELETE'});await load({preserveTrace:true});setRemove(null);onNotice('Товар удалён. В запросе передан только ID — сцепление по данным.');}catch(e){onNotice(e.message);}finally{setBusy(false);}}}>Подтвердить удаление</button></Modal>}
 </>;
}

function Reference(){return <><div className="lab-page-heading"><div className="lab-eyebrow">Две лабораторные · один проект</div><h1>Что объяснять на защите</h1><p>Связность — внутри модуля. Сцепление — между модулями.</p></div><div className="lab-reference-grid"><section className="lab-panel"><h2>Связность · СС</h2><p>Шкала из задания: 0–10, больше — лучше. Это учебные оценки, не результат автоматического измерения.</p>{Object.entries(cohesionTypes).map(([id,t])=><article key={id}><span className="lab-tag" style={{'--tag-color':t.color}}>СС {t.score}</span><h3>{t.name}</h3><p>{t.why}</p></article>)}</section><section className="lab-panel"><h2>Сцепление · СЦ</h2><p>Для показанных оценок меньше — лучше. Цвет и текст на стрелке обозначают тип передаваемого контракта.</p>{Object.entries(couplingTypes).filter(([id])=>id!=='infrastructure').map(([id,t])=><article key={id}><span className="lab-tag" style={{'--tag-color':t.color}}>{t.score===null?'Без балла':`СЦ ${t.score}`}</span><h3>{t.name}</h3><p>{t.why}</p></article>)}<article><h3>Как читать визуализацию</h3><p>Нажмите модуль — увидите его обязанности и настоящий код. Нажмите стрелку — увидите контракт и вид сцепления. «Текущий проект» соответствует исходникам, «Антипаттерн» — отдельная вымышленная модель.</p></article></section></div><section className="lab-panel"><h2>Сценарий показа за 3–5 минут</h2><ol className="lab-defense"><li>На схеме выберите validateProduct: одна задача, функциональная связность, СС 10.</li><li>В «Опытах» проверьте цену −1, затем 100. Объясните, почему SQL не нужен для проверки.</li><li>Выберите «Общие данные»: покажите поиск и четыре счётчика, коммуникативная связность, СС 7.</li><li>Войдите администратором, создайте тестовый товар и загрузите фото. Объясните конвейер, информационная связность, СС 9.</li><li>В опыте submitProduct включите отказ: форма не закрывается раньше подтверждения, процедурная связность, СС 5.</li><li>Измените и удалите только свой тестовый товар. Сравните объект при сохранении (по образцу, СЦ 3) и числовой ID при удалении (по данным, СЦ 1).</li><li>Вернитесь к схеме и воспроизведите путь последнего настоящего запроса.</li></ol></section></>;}

export default function LabApp(){
 const getSection=()=>sections.some(([key])=>key===location.hash.slice(1))?location.hash.slice(1):'schema';
 const [section,setSection]=useState(getSection),[bad,setBad]=useState(false),[selected,setSelected]=useState('validation'),[filter,setFilter]=useState('all'),[source,setSource]=useState(null),[products,setProducts]=useState([]),[loading,setLoading]=useState(true),[loadError,setLoadError]=useState(''),[user,setUser]=useState(null),[login,setLogin]=useState(false),[email,setEmail]=useState('admin1@gmail.com'),[password,setPassword]=useState(''),[loginError,setLoginError]=useState(''),[authBusy,setAuthBusy]=useState(false),[notice,setNotice]=useState(''),[trace,setTrace]=useState(null),[active,setActive]=useState(null),[status,setStatus]=useState(null);
 const playback=useRef(null);
 useEffect(()=>{const handler=()=>setSection(getSection());window.addEventListener('hashchange',handler);return()=>{window.removeEventListener('hashchange',handler);clearInterval(playback.current);};},[]);
 const load=useCallback(async({preserveTrace=false}={})=>{const data=await request('/cosmetics',{onTrace:preserveTrace?undefined:result=>setTrace({...result,path:'/api/cosmetics',method:'GET'})});setProducts(data);setLoadError('');return data;},[]);
 useEffect(()=>{load().catch(e=>setLoadError(e.message)).finally(()=>setLoading(false));request('/auth/me').then(data=>setUser(data.user)).catch(()=>{});request('/lab/status').then(setStatus).catch(()=>{});},[load]);
 useEffect(()=>{if(notice){const timer=setTimeout(()=>setNotice(''),6500);return()=>clearTimeout(timer);}},[notice]);
 const replay=()=>{if(!trace)return;location.hash='schema';setBad(false);setFilter('all');clearInterval(playback.current);let i=0;const next=()=>{if(i>=trace.steps.length){clearInterval(playback.current);setActive(null);return;}const module=trace.steps[i++].module;setActive(module);setSelected(module);};next();playback.current=setInterval(next,850);};
 return <div className="lab-app">
  <header className="lab-header"><a className="lab-brand" href="#schema" aria-label="KIKO Lab — главная"><img src="/brand/kiko-logo.svg" alt="KIKO Milano"/><span>Architecture Lab<small>Связность и сцепление</small></span></a><nav aria-label="Разделы сервиса">{sections.map(([key,title])=><a key={key} className={section===key?'active':''} href={'#'+key} aria-current={section===key?'page':undefined}>{title}</a>)}</nav><div className="lab-header-actions"><a href="http://localhost:3001/" className="lab-shop-link" target="_blank" rel="noreferrer">Магазин ↗</a>{user?<button className="lab-button" onClick={async()=>{try{await request('/auth/logout',{method:'POST'});setUser(null);setNotice('Вы вышли из учётной записи.');}catch(e){setNotice(e.message);}}}>Выйти</button>:<button className="lab-button" onClick={()=>setLogin(true)}>Войти</button>}</div></header>
  <main className="lab-main">
   <div className="lab-environment"><span><i className={loadError?'offline':''}/>{loading?'Подключаемся к БД…':loadError?'Нет соединения с API':`PostgreSQL · ${status?.name||'kiko'} · ${products.length} товаров`}</span><span>{user?.role==='admin'?'Администратор':user?'Покупатель · чтение':'Гостевой просмотр'} <span className="lab-environment-divider">/</span> Учебные оценки по лекции</span></div>
   {loadError&&<div className="lab-error-banner" role="alert">{loadError} <button className="lab-button" onClick={()=>load().catch(e=>setLoadError(e.message))}>Повторить</button></div>}
   {section==='schema'&&<><div className="lab-page-heading lab-schema-heading"><div><div className="lab-eyebrow">Project Work / KIKO Milano</div><h1>Как связаны модули магазина</h1><p>Внутри блока — связность. На стрелке — сцепление. Нажмите на любой элемент.</p></div><div className="lab-mode-switch" aria-label="Вариант архитектуры"><button aria-pressed={!bad} className={!bad?'selected':''} onClick={()=>{setBad(false);setSelected('validation');}}>Текущий проект</button><button aria-pressed={bad} className={bad?'selected bad':''} onClick={()=>{setBad(true);setSelected('monolith');setFilter('all');}}>Антипаттерн</button></div></div>
   <div className="lab-schema-toolbar"><div className="lab-legend"><span>Связи:</span><button className={filter==='all'?'selected':''} onClick={()=>setFilter('all')}>Все</button>{Object.entries(couplingTypes).filter(([key])=>key!=='infrastructure').map(([key,t])=><button key={key} className={filter===key?'selected':''} onClick={()=>setFilter(key)}><i style={{background:t.color}}/>{t.name}{t.score===null?'':` · ${t.score}`}</button>)}</div><span className="lab-muted">СС ↑ лучше · СЦ ↓ лучше</span></div>
   {bad&&<div className="lab-example-banner">Вымышленная модель для сравнения: общие данные, флаги и смешанные обязанности. Такой код не выполняется в магазине.</div>}
   <div className="lab-schema-grid"><Graph bad={bad} selected={selected} onSelect={setSelected} filter={filter} active={active}/><Inspector bad={bad} selected={selected} onSelect={setSelected} onSource={setSource}/></div>
   <div className="lab-cohesion-strip">{Object.entries(cohesionTypes).map(([id,t])=><button key={id} onClick={()=>{setBad(false);setSelected(labNodes.find(n=>n.type===id).id);}}><span style={{color:t.color}}>СС {t.score}</span><strong>{t.name}</strong><small>{labNodes.find(n=>n.type===id).title} ↗</small></button>)}</div><Trace trace={trace} onReplay={replay}/></>}
   {section==='experiments'&&<Experiments products={products}/>}
   {section==='catalog'&&<><Catalog products={products} load={load} user={user} onLogin={()=>setLogin(true)} onTrace={setTrace} onNotice={setNotice}/><Trace trace={trace} onReplay={replay}/></>}
   {section==='reference'&&<Reference/>}
  </main>
  <footer className="lab-footer"><span>KIKO / Architecture Lab</span><span>Отдельный сервис · общие API и PostgreSQL · исходный магазин сохранён</span><a href="#reference">План защиты →</a></footer>
  {notice&&<div className="lab-toast" role="status">{notice}<button onClick={()=>setNotice('')} aria-label="Скрыть уведомление">×</button></div>}
  {source&&<Source id={source} onClose={()=>setSource(null)}/>}
  {login&&<Modal title="Вход администратора" onClose={()=>setLogin(false)}><p className="lab-muted">Учётная запись общая с магазином. Для просмотра схемы вход не требуется.</p><form onSubmit={async e=>{e.preventDefault();setAuthBusy(true);setLoginError('');try{const data=await request('/auth/login',{method:'POST',body:{email,password}});setUser(data.user);setLogin(false);setPassword('');setNotice(data.user.role==='admin'?'Вы вошли как администратор. CRUD доступен.':'Вход выполнен. Для изменения товаров нужна роль администратора.');}catch(e){setLoginError(e.message);}finally{setAuthBusy(false);}}}><label className="lab-field">Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="username"/></label><label className="lab-field">Пароль<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/></label>{loginError&&<p role="alert" className="lab-error">{loginError}</p>}<button className="lab-button primary" disabled={authBusy}>{authBusy?'Входим…':'Войти в сервис'}</button></form></Modal>}
 </div>;
}
