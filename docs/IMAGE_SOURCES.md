# Изображения KIKO

Фотографии и белый логотип загружены с официального американского сайта KIKO Milano и сохранены в проекте, чтобы устаревшие ссылки не оставляли пустые блоки. Содержание и фотографии принадлежат соответствующим правообладателям.

| Локальный файл | Оригинал |
|---|---|
| public/brand/kiko-logo.svg | https://us.kikocosmetics.com/cdn/shop/files/Logo_-_white.svg |
| public/images/hero-lips.webp | https://us.kikocosmetics.com/cdn/shop/files/Allure_BestofBeauty_3DHydra_us_herodesktop_c5726495-e3f6-45e8-b94a-eccef0260a51.webp |
| public/images/hero-gifts.webp | https://us.kikocosmetics.com/cdn/shop/files/LimitedEdition_TwistNTwinkle_GiftSet_Desktop_US_2.webp |
| public/images/hero-beauty.jpg | https://us.kikocosmetics.com/cdn/shop/files/FeaturedContentDesktop_8.jpg |
| public/images/beauty-lips.jpg | https://us.kikocosmetics.com/cdn/shop/files/FeaturedContentDesktop.jpg |
| public/images/beauty-eyes.jpg | https://us.kikocosmetics.com/cdn/shop/files/FeaturedContentDesktop_5.jpg |
| public/images/beauty-care.jpg | https://us.kikocosmetics.com/cdn/shop/files/FeaturedContentDesktop_9.jpg |
| public/images/store.webp | https://us.kikocosmetics.com/cdn/shop/files/US_Website_Footer_Stores.webp |

Точные исходные ссылки на фото каталога и их локальные копии перечислены в src/helpers/product-assets.json. Они взяты из существующего db.json. Для двух недоступных оригиналов используется явно подписанная SVG-заглушка Photo unavailable. Новые загруженные пользователем изображения продолжают храниться в PostgreSQL.

favicon.svg и product-placeholder.svg — векторные элементы проекта. Для обновления кэша исходных фото: `node scripts/cache-product-images.mjs`.
