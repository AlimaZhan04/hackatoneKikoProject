import React,{useEffect,useState} from 'react';
import { Box,Button,Typography,Tabs,Tab,Table,TableHead,TableBody,TableCell,TableRow,Paper,TextField,Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { cohesion,coupling } from '../studio/labs.mjs';
import { filterProducts,summarizeProducts } from '../studio/catalog.mjs';
import { productsApi } from '../studio/api.mjs';
export default function ProjectWork(){
 const [tab,setTab]=useState(0),[products,setProducts]=useState([]),[query,setQuery]=useState(''),[id,setId]=useState(''),[file,setFile]=useState(null),[message,setMessage]=useState(''),[busy,setBusy]=useState(false),[events,setEvents]=useState([]);
 const refresh=()=>productsApi.list().then(setProducts).catch(error=>setMessage(error.message));
 useEffect(()=>{refresh();const load=()=>setEvents(JSON.parse(sessionStorage.getItem('kiko-project-work')||'[]'));load();window.addEventListener('kiko-project-work',load);return()=>window.removeEventListener('kiko-project-work',load);},[]);
 const summary=summarizeProducts(products),visible=filterProducts(products,query,'');
 return <Box sx={{maxWidth:1100,mx:'auto',my:5,px:3}}>
  <Typography variant="h4" component="h1" gutterBottom>Project Work</Typography>
  <Button component="a" href={`http://${window.location.hostname}:3003/`} variant="contained" sx={{mb:2}}>Открыть интерактивную схему связности и сцепления</Button>
  <Typography paragraph>Связность — отношения внутри модуля. Сцепление — зависимости между модулями. Обычные страницы магазина сохранены; эта страница предназначена для защиты лабораторных.</Typography>
  <Box sx={{display:'flex',gap:2,flexWrap:'wrap',mb:3}}><Button component={Link} to="/">Магазин</Button><Button component={Link} to="/admin">Добавить товар</Button><Button component={Link} to="/best">Каталог и CRUD</Button><Button component={Link} to="/auth">Войти</Button></Box>
  <Tabs value={tab} onChange={(e,value)=>setTab(value)}><Tab label="Лабораторная 1 — связность"/><Tab label="Лабораторная 2 — сцепление"/></Tabs>
  <Typography sx={{my:2}}>{tab===0?'СС от 0 до 10: чем больше, тем лучше. Показаны четыре типа по шкале лекции.':'СЦ от 0 до 9: чем меньше, тем лучше. Для управления балл в заметках не указан.'}</Typography>
  {(tab===0?cohesion:coupling).map(item=><Paper key={item.id} variant="outlined" sx={{p:3,mb:2}}><Typography variant="h6">{item.title} · {item.score}</Typography><Typography sx={{my:1}}><b>Где показать:</b> {item.where}</Typography><Typography paragraph>{item.demo}</Typography><Typography paragraph><b>Что сказать:</b> {item.why}</Typography><Typography component="code" sx={{fontSize:12,overflowWrap:'anywhere'}}>{item.file}</Typography></Paper>)}
  <Typography variant="h5" sx={{mt:4,mb:2}}>Коммуникативная связность</Typography>
  <Typography paragraph>Список и статистика используют один массив товаров. После добавления или удаления нажмите «Обновить». Поиск меняет строки таблицы, счётчики относятся ко всему каталогу.</Typography>
  <Box sx={{display:'flex',gap:3,my:2,flexWrap:'wrap'}}>{[['Всего',summary.total],['Макияж',summary.decorative],['Уход',summary.care],['Аксессуары',summary.accessories]].map(([name,value])=><Paper variant="outlined" sx={{p:2,minWidth:130}} key={name}>{name}<Typography variant="h4">{value}</Typography></Paper>)}</Box>
  <Box sx={{display:'flex',gap:2,my:2}}><TextField label="Поиск товаров" size="small" value={query} onChange={e=>setQuery(e.target.value)}/><Button onClick={refresh}>Обновить</Button></Box>
  <Box sx={{overflowX:'auto'}}><Table size="small"><TableHead><TableRow>{['ID','Товар','Категория','Цена $','Действия'].map(label=><TableCell key={label}>{label}</TableCell>)}</TableRow></TableHead><TableBody>{visible.map(product=><TableRow key={product.id}><TableCell>{product.id}</TableCell><TableCell>{product.name}</TableCell><TableCell>{product.type}</TableCell><TableCell>{product.price}</TableCell><TableCell><Button component={Link} to={'/edit/'+product.id}>Изменить</Button></TableCell></TableRow>)}</TableBody></Table></Box>
  <Typography variant="h5" sx={{mt:4,mb:2}}>Информационная связность</Typography>
  <Typography paragraph>По лекции: файл → проверка содержимого → WebP → байты в PostgreSQL → адрес → поле image. В другой терминологии это последовательная связность. Укажите ID существующего товара из таблицы. Требуется вход администратора.</Typography>
  <Box component="form" onSubmit={async e=>{e.preventDefault();if(!file){setMessage('Выберите файл');return;}setBusy(true);try{await productsApi.photo(id,file);setMessage('Фото сохранено. Откройте товар в магазине.');await refresh();}catch(error){setMessage(error.message);}finally{setBusy(false);}}} sx={{display:'flex',gap:2,alignItems:'center',flexWrap:'wrap'}}><TextField label="ID товара" size="small" type="number" value={id} onChange={e=>setId(e.target.value)} required/><input aria-label="Фото товара" type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>setFile(e.target.files[0])}/><Button variant="contained" type="submit" disabled={busy||!id||!file}>Загрузить фото</Button></Box>
  {message&&<Alert severity="info" sx={{my:2}}>{message}</Alert>}
  <Typography variant="h5" sx={{mt:4,mb:2}}>Журнал реальных действий</Typography><Typography paragraph>Выполните CRUD в обычных формах и вернитесь сюда. Последнее действие сверху. Журнал хранится в текущей вкладке, без паролей и данных авторизации.</Typography><Button onClick={()=>{sessionStorage.removeItem('kiko-project-work');setEvents([]);}}>Очистить журнал</Button>{events.map((event,index)=><Box component="details" key={index} sx={{p:1,borderBottom:'1px solid #ddd'}}><summary>{event.time} · {event.title}</summary><pre style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}>{JSON.stringify(event.data||{},null,2)}</pre></Box>)}
 </Box>;
}
