// Карта составлена по исходникам. Баллы — учебная шкала из задания, не метрика анализатора.
export const cohesionTypes = {
 functional:{name:'Функциональная',score:10,color:'#63e0c5',why:'Одна цель: проверить данные товара и вернуть ошибки. Здесь нет SQL, навигации или обработки изображений.'},
 information:{name:'Информационная',score:9,color:'#8eb5ff',why:'Выход предыдущего этапа становится входом следующего: файл → проверка → WebP → сохранение → адрес фото. Термин сохранён по лекции; этот конвейер также называют последовательной связностью.'},
 communication:{name:'Коммуникативная',score:7,color:'#e5d17d',why:'Фильтрация и статистика используют одну коллекцию товаров, но получают разные результаты.'},
 procedural:{name:'Процедурная',score:5,color:'#e7a2c9',why:'Разные действия объединены необходимым порядком: отправить → дождаться записи → обновить список → закрыть форму.'}
};
export const couplingTypes = {
 data:{name:'По данным',score:1,color:'#63e0c5',why:'Передаётся простое значение: числовой id. Принимающему модулю не нужна вся структура товара.'},
 stamp:{name:'По образцу',score:3,color:'#e5d17d',why:'Передаётся структура: товар или объект файла. Это широкая трактовка лекции; в строгой классификации отдельно проверяют наличие избыточных полей.'},
 control:{name:'По управлению',score:null,color:'#e7a2c9',why:'Параметр выбирает действие другого модуля: method задаёт HTTP-метод, callback задаёт следующий шаг. Балл в заметках не указан.'},
 infrastructure:{name:'Инфраструктура',score:null,color:'#94a5bb',why:'Соединение с драйвером и сервером PostgreSQL. Это техническая зависимость, отдельный учебный балл ей не назначен.'}
};
export const labNodes = [
 {id:'ui',title:'Интерфейс KIKO Lab',sub:'React · формы и таблица',x:24,y:256,file:'src/lab/LabApp.jsx',functions:['выбрать опыт','показать каталог','запустить CRUD'],why:'Собирает экран и вызывает модули. Ответственность за проверку, HTTP и SQL вынесена из интерфейса.'},
 {id:'submit',title:'submitProduct',sub:'Сценарий сохранения',x:242,y:64,file:'src/studio/submit-product.mjs',type:'procedural',functions:['persist()','refresh()','close()','notify()']},
 {id:'validation',title:'validateProduct',sub:'Проверка данных',x:464,y:64,file:'shared/product-validation.mjs',type:'functional',functions:['название','цена','категория','ссылка на фото']},
 {id:'catalog',title:'Общие данные',sub:'Фильтрация и статистика',x:242,y:488,file:'src/studio/catalog.mjs',type:'communication',functions:['filterProducts(products)','summarizeProducts(products)']},
 {id:'client',title:'HTTP-клиент',sub:'request(path, options)',x:464,y:276,file:'src/lab/client.mjs',functions:['GET /cosmetics','POST /cosmetics','PUT /cosmetics/:id','DELETE /cosmetics/:id'],why:'Общий клиент отправляет запросы настоящему API. Управляющий параметр method выбирает HTTP-действие.'},
 {id:'routes',title:'Маршруты API',sub:'Express · права и валидация',x:686,y:200,file:'server/modules/products/product.routes.mjs',functions:['requireAdmin','validate(req, res, next)','создать / изменить / удалить'],why:'Принимает HTTP-запрос, проверяет права и данные, затем вызывает нужную операцию репозитория.'},
 {id:'photo',title:'processProductPhoto',sub:'Конвейер изображения',x:908,y:64,file:'server/modules/products/product.photo.mjs',type:'information',functions:['проверить формат','преобразовать в WebP','savePhoto(id, bytes)']},
 {id:'repository',title:'productRepository',sub:'Операции над products',x:908,y:300,file:'server/modules/products/product.repository.mjs',functions:['listProducts / getProduct','createProduct / updateProduct','deleteProduct / savePhoto'],why:'SQL-запросы к товарам собраны в одном модуле. Числовой id и объект товара показывают два вида сцепления.'},
 {id:'pool',title:'Пул соединений',sub:'pg.Pool · DATABASE_URL',x:686,y:488,file:'server/db.mjs',functions:['pool.query(sql, values)','pool.connect()'],why:'Повторно использует соединения к PostgreSQL. Настройки берёт из окружения; секреты на этой странице не показываются.'},
 {id:'database',title:'PostgreSQL',sub:'Таблица products',x:908,y:488,file:'server/migrate.mjs',functions:['products','users и sessions','newsletter_subscriptions'],why:'Постоянное хранение данных. Ограничения таблицы защищают цену и категорию независимо от интерфейса.'}
];
export const labEdges = [
 {id:'ui-submit',from:'ui',to:'submit',type:'control',label:'Сценарий',contract:'{ persist, refresh, close, notify, record }',why:'Интерфейс передаёт функции обратного вызова. submitProduct управляет порядком их вызова.'},
 {id:'ui-validation',from:'ui',to:'validation',type:'stamp',label:'Поля формы',contract:'validateProduct(product)',why:'Перед сохранением интерфейс передаёт объект в общий валидатор.'},
 {id:'ui-catalog',from:'ui',to:'catalog',type:'stamp',label:'Общая коллекция',contract:'filterProducts(products, query, category); summarizeProducts(products)',why:'Один массив из API используется таблицей и счётчиками.'},
 {id:'submit-client',from:'submit',to:'client',type:'control',label:'persist → request',contract:'persist: () => request(path, { method, body })',why:'Сценарий вызывает переданную функцию persist; она выполняет запрос и ожидает его результат.'},
 {id:'ui-client',from:'ui',to:'client',type:'control',label:'HTTP-действие',contract:'request(path, { method: "DELETE", body })',why:'method выбирает действие общего клиента. Удаление и загрузка фото также вызываются из интерфейса.'},
 {id:'client-routes',from:'client',to:'routes',type:'stamp',label:'HTTP / JSON',contract:'HTTP /api/cosmetics + JSON или FormData',why:'Два процесса обмениваются данными через контракт HTTP. Это транспортная связь; для тела запроса показана передача структуры.'},
 {id:'routes-validation',from:'routes',to:'validation',type:'stamp',label:'Данные запроса',contract:'validateProduct(req.body)',why:'Сервер повторно проверяет товар; проверки браузера недостаточно.'},
 {id:'routes-photo',from:'routes',to:'photo',type:'stamp',label:'ID + файл',contract:'processProductPhoto(req.productId, req.file)',why:'Передаётся id и структура файла с buffer и метаданными.'},
 {id:'routes-data',from:'routes',to:'repository',type:'data',label:'ID · СЦ 1',contract:'deleteProduct(req.productId)',why:'Для удаления передаётся только простое числовое значение id.'},
 {id:'routes-stamp',from:'routes',to:'repository',type:'stamp',label:'Товар · СЦ 3',contract:'createProduct(req.productData); updateProduct(id, product)',why:'Для создания и изменения передаётся объект с полями name, description, price, type, image.'},
 {id:'photo-repository',from:'photo',to:'repository',type:'stamp',label:'Байты WebP',contract:'savePhoto(id, optimized)',why:'Обработчик изображения передаёт репозиторию байты готового фото.'},
 {id:'repository-pool',from:'repository',to:'pool',type:'infrastructure',label:'SQL + параметры',contract:'pool.query(sql, values)',why:'Репозиторий использует драйвер pg. Значения подставляются параметрами $1, $2, …'},
 {id:'pool-db',from:'pool',to:'database',type:'infrastructure',label:'Соединение',contract:'PostgreSQL wire protocol',why:'Драйвер отправляет SQL серверу PostgreSQL и получает результат.'}
];
export const badNodes = [
 {id:'bad-ui',title:'Экран каталога',sub:'Учебный антипаттерн',x:90,y:270,functions:['показать список','закрыть форму'],why:'В учебном примере экран закрывается до подтверждения сохранения.'},
 {id:'monolith',title:'saveEverything',sub:'Все задачи в одной функции',x:410,y:260,functions:['проверить цену','подготовить фото','составить SQL','сменить экран','отправить письмо'],why:'Несвязанные задачи собраны вместе. Изменение правил цены затрагивает работу с БД и интерфейсом. Этот модуль вымышленный: в рабочем проекте его нет.'},
 {id:'bad-db',title:'Общие данные',sub:'Прямое изменение из UI',x:820,y:170,functions:['глобальный массив','общий флаг ошибки'],why:'Вымышленный пример зависимости от общего изменяемого состояния.'},
 {id:'bad-mail',title:'Уведомления',sub:'Чужая ответственность',x:820,y:410,functions:['условная отправка'],why:'Это схема для сравнения. Никакие письма в опыте не отправляются.'}
];
export const badEdges = [
 {id:'bad-call',from:'bad-ui',to:'monolith',type:'control',label:'Режим + флаги',contract:'saveEverything(mode, closeEarly)',why:'Флаги переключают несвязанные обязанности одной функции.'},
 {id:'bad-direct',from:'monolith',to:'bad-db',type:'stamp',label:'Общий объект',contract:'state.products.push(product)',why:'Условный UI изменяет данные до подтверждения записи.'},
 {id:'bad-return',from:'bad-db',to:'bad-ui',type:'control',label:'Общий флаг',contract:'state.error',why:'Потребители вынуждены знать устройство общего состояния.'},
 {id:'bad-mail-edge',from:'monolith',to:'bad-mail',type:'control',label:'Ещё одна задача',contract:'if (mode === "mail") …',why:'Уведомления смешаны с проверкой товара и SQL.'}
];
