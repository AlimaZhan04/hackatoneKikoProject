"""Build the lab report from screenshots captured in the running original UI."""
from pathlib import Path
import json
from docx import Document
from docx.shared import Inches,Pt,Cm,RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT,WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

ROOT=Path(__file__).resolve().parent.parent
IMAGES=ROOT/'docs/screenshots'
OUT=ROOT/'docs/KIKO_Project_Work.docx'
d=Document();section=d.sections[0]
section.page_width=Cm(21);section.page_height=Cm(29.7)
section.top_margin=Cm(1.8);section.bottom_margin=Cm(1.8);section.left_margin=Cm(2.2);section.right_margin=Cm(1.8)
for name in ['Normal','Title','Subtitle','Heading 1','Heading 2','Heading 3','Caption']:
 s=d.styles[name];s.font.name='Calibri';s.font.color.rgb=RGBColor(0,0,0)
 s._element.get_or_add_rPr().get_or_add_rFonts().set(qn('w:eastAsia'),'Calibri')
normal=d.styles['Normal'];normal.font.size=Pt(11);normal.paragraph_format.line_spacing=1.15;normal.paragraph_format.space_after=Pt(8)
d.styles['Title'].font.size=Pt(31);d.styles['Title'].font.bold=False
d.styles['Title'].paragraph_format.space_after=Pt(16)
d.styles['Subtitle'].font.size=Pt(15);d.styles['Subtitle'].paragraph_format.space_after=Pt(24)
for name,size in [('Heading 1',23),('Heading 2',15),('Heading 3',12)]:
 s=d.styles[name];s.font.size=Pt(size);s.font.bold=True;s.paragraph_format.space_before=Pt(12);s.paragraph_format.space_after=Pt(9)
d.styles['Caption'].font.size=Pt(9);d.styles['Caption'].font.italic=False
d.styles['Caption'].paragraph_format.space_after=Pt(12)
code=d.styles.add_style('Code',1);code.font.name='Consolas';code.font.size=Pt(9)
code.paragraph_format.space_after=Pt(5);code.paragraph_format.line_spacing=1.05
footer=section.footer.paragraphs[0];footer.alignment=WD_ALIGN_PARAGRAPH.RIGHT
r=footer.add_run('KIKO MILANO  /  PROJECT WORK                                       ');r.font.size=Pt(8)
field=OxmlElement('w:fldSimple');field.set(qn('w:instr'),'PAGE');footer._p.append(field)
d.core_properties.title='Связность и сцепление модулей в проекте KIKO'
d.core_properties.subject='Project Work — лабораторные работы 1 и 2'
d.core_properties.author='KIKO Project'

def p(text='',bold_lead=None):
 a=d.add_paragraph()
 if bold_lead and text.startswith(bold_lead):a.add_run(bold_lead).bold=True;a.add_run(text[len(bold_lead):])
 else:a.add_run(text)
 return a
def h(text,level=1):d.add_heading(text,level)
def page(title,kicker=None):
 if kicker:
  a=p(kicker.upper());a.paragraph_format.page_break_before=True
  r=a.runs[0];r.font.size=Pt(9);r.bold=True
  h(title)
 else:
  a=d.add_heading(title,1);a.paragraph_format.page_break_before=True
def steps(items):
 for i,item in enumerate(items,1):p(f'{i}. {item}')
def pic(name,caption,width=6.3):
 path=IMAGES/name
 if not path.exists():raise FileNotFoundError(path)
 a=d.add_paragraph();a.alignment=WD_ALIGN_PARAGRAPH.CENTER
 a.add_run().add_picture(str(path),width=Inches(width))
 a.paragraph_format.space_after=Pt(5)
 d.add_paragraph(caption,'Caption')
def table(headers,rows,widths):
 t=d.add_table(rows=1,cols=len(headers));t.alignment=WD_TABLE_ALIGNMENT.CENTER;t.autofit=False
 for col,width in zip(t.columns,widths):col.width=Cm(width)
 for cell,width,text in zip(t.rows[0].cells,widths,headers):cell.width=Cm(width);cell.text=text
 for row in rows:
  cells=t.add_row().cells
  for cell,width,text in zip(cells,widths,row):cell.width=Cm(width);cell.text=str(text)
 for ri,row in enumerate(t.rows):
  props=row._tr.get_or_add_trPr();cant=OxmlElement('w:cantSplit');props.append(cant)
  if ri==0:
   repeat=OxmlElement('w:tblHeader');props.append(repeat)
  for ci,cell in enumerate(row.cells):
   cell.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
   tcpr=cell._tc.get_or_add_tcPr();borders=OxmlElement('w:tcBorders')
   for edge in ('top','left','bottom','right'):
    el=OxmlElement('w:'+edge);el.set(qn('w:val'),'single');el.set(qn('w:sz'),'4');el.set(qn('w:color'),'D9D9D9');borders.append(el)
   tcpr.append(borders)
   margins=OxmlElement('w:tcMar')
   for edge,value in [('top',100),('bottom',100),('left',110),('right',110)]:
    el=OxmlElement('w:'+edge);el.set(qn('w:w'),str(value));el.set(qn('w:type'),'dxa');margins.append(el)
   tcpr.append(margins)
   shade=OxmlElement('w:shd');shade.set(qn('w:fill'),'292929' if ri==0 else 'F5F5F5' if ri%2==0 else 'FFFFFF');tcpr.append(shade)
   for a in cell.paragraphs:
    a.paragraph_format.space_after=Pt(0);a.paragraph_format.line_spacing=1.08
    for r in a.runs:r.font.size=Pt(9);r.font.bold=ri==0;r.font.color.rgb=RGBColor(255,255,255) if ri==0 else RGBColor(0,0,0)
 return t

p('PROJECT WORK  /  ЛАБОРАТОРНЫЕ РАБОТЫ 1 И 2').runs[0].font.size=Pt(10)
d.add_paragraph('Связность и сцепление\nмодулей в проекте KIKO','Title')
d.add_paragraph('Магазин косметики KIKO Milano\nРазбор кода и сценарии демонстрации','Subtitle')
p('В проекте показаны четыре вида связности и три вида сцепления. Каждый пример связан с действующим элементом интерфейса, конкретной функцией и наблюдаемым результатом. Данные товаров и загруженные фото сохраняются в PostgreSQL.')
h('Предмет работы',2)
p('Лабораторная работа 1 рассматривает связи между частями одного модуля. Лабораторная работа 2 рассматривает зависимости между разными модулями. Цель — высокая внутренняя связность при простом взаимодействии модулей.')
table(['Параметр','Реализация'],[
 ('Интерфейс','Исходные страницы React и CSS магазина'),
 ('Сервер и данные','Express API и PostgreSQL 18'),
 ('Демонстрация','Отдельная страница /project-work'),
 ('Основной сценарий','Создание, просмотр списка, изменение и удаление товара')],[4.1,12.7])
h('Как открыть проект',2)
p('Из папки проекта выполнить команды по порядку. На этом компьютере зависимости уже установлены.')
for line in ['npm run db:local','npm run db:seed','npm start']:d.add_paragraph(line,'Code')
p('Магазин: http://localhost:3001. Лабораторные: http://localhost:3001/project-work. Для запуска также подготовлен файл start-kiko.cmd.')
p('Дизайн магазина сохранён. Дополнительные таблицы, пояснения и журнал находятся только на странице лабораторных.')

page('Архитектура и действующий CRUD','Объект исследования')
p('В исходной версии товары находились в db.json, запросы были рассчитаны на JSON-сервер, а авторизация зависела от отсутствующего файла Firebase. Теперь интерфейс обращается к API приложения, а сервер выполняет запросы к PostgreSQL.')
p('Страница React → контекст товаров → HTTP-маршрут → проверка данных → репозиторий → PostgreSQL')
table(['Модуль','Назначение'],[
 ('src/components/Product','Исходные карточка товара и формы AddProduct и EditProduct'),
 ('src/contexts/ProductContextProvider.js','Запросы, общий список товаров и обновление состояния'),
 ('shared/product-validation.mjs','Чистая функция validateProduct возвращает ошибки полей'),
 ('server/modules/products/product.routes.mjs','HTTP-маршруты и вызовы функций предметной области'),
 ('server/modules/products/product.repository.mjs','Параметризованные SQL-запросы к таблице products'),
 ('server/modules/products/product.photo.mjs','Проверка изображения и преобразование в WebP'),
 ('src/project-work/ProjectWork.jsx','Страница защиты с пояснениями, статистикой и журналом')],[7.1,9.7])
h('Операции над товарами',2)
table(['Операция','Где в исходном интерфейсе','Запрос'],[
 ('Создать','Admin Page → ADD PRODUCT','POST /api/cosmetics'),
 ('Прочитать','Главная, Best Sellers, Accessories','GET /api/cosmetics'),
 ('Изменить','Карточка → edit → save changes','PUT /api/cosmetics/:id'),
 ('Удалить','Карточка → delete','DELETE /api/cosmetics/:id')],[2.4,7.7,6.7])
p('Все изменения доступны после входа администратора. Сервер проверяет роль самостоятельно; скрытие кнопок на клиенте не заменяет эту проверку.')
h('Данные и целостность',2)
p('products содержит ID, название, описание, цену, категорию, адрес фото, байты изображения и даты изменений. users хранит учётные записи и scrypt-хеши паролей; sessions — хеши токенов сессий. При импорте PostgreSQL назначает ID заново, поскольку часть исходных записей не имела ID.')

page('Функциональная связность','Лабораторная работа 1  /  СС 10')
p('Граница рассматриваемого модуля — функция validateProduct в shared/product-validation.mjs. Все её проверки служат одной задаче: определить, можно ли сохранить данные товара. Функция не отправляет HTTP-запросы и не изменяет базу данных.')
steps(['Войти администратором и открыть Admin Page.','Заполнить Name, Description и Type decorative; в Price ввести −1.','Нажать ADD PRODUCT. У поля цены появится ошибка, форма останется открытой.'])
pic('functional.png','Рисунок 1. Проверка отрицательной цены в исходной форме добавления товара.',3.7)
h('Объяснение на защите',2)
p('«Здесь функциональная связность, СС 10. Функция validateProduct решает одну задачу — проверяет товар и возвращает ошибки. С отрицательной ценой запрос на создание не выполняется. Сервер повторно использует тот же валидатор, поэтому проверку нельзя обойти прямым запросом».')
p('Проверяются имя, цена с точностью до двух знаков, описание, категория и безопасный формат ссылки на фото. Объединение нескольких проверок не нарушает единую цель функции.')

page('Информационная связность','Лабораторная работа 1  /  СС 9')
p('В терминологии лекции информационная связность — конвейер, в котором результат одного этапа становится входом следующего. Пример — processProductPhoto в product.photo.mjs и последующее сохранение через savePhoto в product.repository.mjs.')
p('Файл → проверка фактического формата → преобразование в WebP → сохранение байтов → адрес изображения → поле image товара.')
steps(['Создать товар в исходной форме и найти его ID в таблице на /project-work.','В разделе загрузки фото указать ID и выбрать PNG, JPEG или WebP.','Нажать «Загрузить фото», затем открыть товар в обычном каталоге.'])
pic('photo.png','Рисунок 2. Загрузка изображения для существующего товара на странице лабораторных.',6.3)
pic('product.png','Рисунок 3. Результат конвейера в исходной карточке магазина.',1.9)
p('«Это информационная связность, СС 9 по нашей лекции: каждый этап использует результат предыдущего. Фото и его адрес сохраняются в одной транзакции, поэтому ссылка не фиксируется отдельно от изображения».')
p('Терминология. Во многих учебниках такой вид называется последовательной связностью. В этой работе сохранено название из лекции; информационная связность в другой классификации может означать операции над общей скрытой структурой данных.')

page('Коммуникативная связность','Лабораторная работа 1  /  СС 7')
p('Граница модуля — операции представления коллекции в src/studio/catalog.mjs. filterProducts формирует строки таблицы, summarizeProducts вычисляет четыре счётчика. Обе операции получают один массив products, но выдают разные результаты.')
steps(['Открыть /project-work и запомнить общий счётчик.','Добавить тестовый товар через обычную Admin Page.','Вернуться на /project-work и нажать «Обновить»: изменятся список, общий счётчик и счётчик категории.'])
pic('communication.png','Рисунок 4. Один набор товаров используется таблицей и четырьмя счётчиками.',6.3)
p('В демонстрации импортированная коллекция содержала 15 товаров. После добавления одного тестового товара общий счётчик стал равен 16. Изменение числа записей подтверждается одновременно таблицей и статистикой. Поиск может ограничить видимые строки; счётчики при этом описывают всю коллекцию.')
h('Объяснение на защите',2)
p('«Здесь коммуникативная связность, СС 7. Функции объединены общими входными данными products. Одна функция возвращает отфильтрованный список, другая — статистику. Это связь внутри модуля, а не характеристика обмена между сервером и браузером».')
p('Счётчики добавлены на отдельную учебную страницу. Разметка исходного каталога магазина не изменена.')

page('Процедурная связность','Лабораторная работа 1  /  СС 5')
p('Граница модуля — сценарий submitProduct в src/studio/submit-product.mjs. Он координирует разные действия интерфейса в определённом порядке. Исходные AddProduct и EditProduct вызывают этот сценарий без изменения оформления форм.')
steps(['Отправить проверенные данные товара на сервер.','Дождаться подтверждения записи PostgreSQL.','Обновить коллекцию товаров.','Перейти из формы на главную страницу.'])
pic('procedure.png','Рисунок 5. Журнал фиксирует реальные этапы сохранения. Последняя запись находится сверху.',6.3)
h('Почему порядок важен',2)
p('Переход до завершения записи мог бы скрыть ошибку сервера. Теперь используется await: при отказе записи переход не выполняется и введённые значения остаются в форме. Если запись завершена, а обновление списка не удалось, сценарий различает эти два результата.')
for line in ['await persist();','await refresh();','close();  // переход из формы','notify(...);']:d.add_paragraph(line,'Code')
p('«Это процедурная связность, СС 5 на уровне сценария интерфейса. Отправка, обновление состояния и переход объединены необходимым порядком. Конвейер фото рассматривается отдельно: там данные одного этапа непосредственно обрабатываются следующим».')

page('Сцепление между модулями','Лабораторная работа 2')
p('Сцепление характеризует внешнюю зависимость модулей. Для каждого примера нужно назвать обе стороны границы и значение, которое передаётся. По шкале лекции СЦ лежит от 0 до 9; меньшая оценка означает более слабую зависимость.')
table(['Тип','СЦ','Граница и передаваемые данные'],[
 ('По данным','1','product.routes.mjs → product.repository.mjs: deleteProduct(id), простое число'),
 ('По образцу','3','Маршрут → createProduct(product) или updateProduct(id, product): структура полей товара'),
 ('По управлению','—','productsApi.photo → request: параметр method выбирает HTTP-действие')],[3.8,1.2,11.8])
h('По данным',2)
p('В каталоге удалить только созданный тестовый товар кнопкой delete. Маршрут извлекает ID и вызывает deleteProduct(req.productId). Репозиторию достаточно числа; ему не нужны название, цена или описание. В журнале виден DELETE /api/cosmetics/:id. Исходная кнопка удаляет запись сразу.')
h('По образцу',2)
p('При создании или изменении маршрут передаёт объект с name, description, price, type и image. Это передача структуры по классификации лекции, СЦ 3. В более узком определении stamp coupling дополнительно рассматривают ситуацию, когда получателю нужны лишь некоторые поля переданной структуры. В текущем репозитории поля используются при сохранении товара.')
h('По управлению',2)
p('При загрузке фото productsApi.photo вызывает общий request с method: POST. Этот параметр управляет видом HTTP-операции. Он отличается по назначению от ID товара: ID выбирает запись, method выбирает действие. Числовая оценка этого вида в заметках не задана.')
pic('coupling.png','Рисунок 6. Запрос удаления тестового товара и переданный идентификатор в журнале.',6.3)

page('Сценарий защиты и результаты','Практическая часть')
table(['Показ','Краткое объяснение'],[
 ('1  Price −1 в Admin Page','Функциональная, СС 10. Одна задача — проверить товар.'),
 ('2  Загрузка фото по ID','Информационная, СС 9 по лекции. Этапы образуют конвейер данных.'),
 ('3  Таблица и счётчики','Коммуникативная, СС 7. Функции используют общий массив.'),
 ('4  Журнал сохранения','Процедурная, СС 5. Действия выполняются в обязательном порядке.'),
 ('5  delete тестового товара','По данным, СЦ 1. Между маршрутом и репозиторием передан ID.'),
 ('6  Создание и изменение','По образцу, СЦ 3. Передаётся структура товара.'),
 ('7  POST при загрузке фото','По управлению. method выбирает HTTP-действие.')],[6.2,10.6])
h('Проверка реализации',2)
p('Выполнены 6 модульных проверок и интеграционный сценарий с настоящим PostgreSQL. Проверены валидация, работа с общей коллекцией, порядок сохранения, вход администратора, запрет записи гостю, полный CRUD, отклонение файла с поддельным типом, сохранение WebP и ответы 400/404. Производственная сборка приложения завершена успешно.')
p('Команды для повторной проверки: npm test; npm run test:api; npm run build. Временные записи интеграционных тестов удаляются. Демонстрационный товар после снятия скриншотов также удалён.')
h('Вывод',2)
p('Примеры показывают разные уровни организации программы: функцию проверки, модуль обработки фото, операции над коллекцией, сценарий интерфейса и вызовы между серверными модулями. Высокая связность достигается общей понятной целью частей модуля. Низкое сцепление поддерживается передачей необходимых данных и изоляцией SQL в репозитории.')
h('Источники и терминология',2)
p('1. Заметки по лекции Project Work и предоставленный пример таблицы: определения, шкалы СС и СЦ. Оценки 10, 9, 7, 5 и 1, 3 являются учебными значениями, а не результатом автоматического анализа.')
p('2. Исходный код и воспроизводимые сценарии проекта KIKO Milano. Репозиторий: https://github.com/AlimaZhan04/hackatoneKikoProject/tree/codex/postgres-project-work')
p('3. UMBC — Coupling and Cohesion: https://courses.cs.umbc.edu/201/spring12/lectures/couplingandcohesion.html — различение процедурной и последовательной связности.')
p('4. University of Akron — Coupling and Cohesion: https://mlcollard.net/cpsc680f25/notes/Coupling-and-Cohesion.html — информационная связность в альтернативной классификации.')

OUT.parent.mkdir(exist_ok=True)
for root in (d.element,d.styles.element):
 for border in root.xpath('.//w:pBdr'):
  border.getparent().remove(border)
d.save(OUT)
print(OUT)
