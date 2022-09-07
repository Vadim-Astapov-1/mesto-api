# Проект «Mesto»

Backend проекта mesto. Расположен на облачном сервере Yandex.Cloud.

## Описание

Сервер для обработки запросов клиента [mesto](https://va-mesto.ru), использующий базу данных NoSQL - MongoDB.
<br />
Настройка сервера в Yandex.Cloud проводилась на операционной системе **Ubuntu 20.04**.

## Технологии

- Node.js
- Express.js
- MongoDB

### Роуты

- /signup - post (Регистрация)
- /signin - post (Авторизация)
- /signout - get (Удалить куки)
***
- /users - get (Получить всех пользователей)
- /users/:userId - get (Получить пользователя по id)
- /users/me - get (Получить пользователя)
- /users/me - patch (Обновить профиль)
- /users/avatar - patch (Обновить аватар)
***
- /cards - get (Получить все карточки)
- /cards/:cardId - delete (Удалить карточку)
- /cards - post (Создать карточку)
- /cards//:cardId/likes - put (Добавить лайк карточке)
- /cards//:cardId/likes - delete (Убрать лайк с карточки)

### Зависимости

1.  eslint: ^8.5.0
2.  eslint-config-airbnb-base: ^15.0.0
3.  eslint-plugin-import: ^2.25.3
4.  nodemon: ^2.0.15
5.  bcryptjs: ^2.4.3
6.  body-parser: ^1.19.1
7.  celebrate: ^15.0.0
8.  cookie-parser: ^1.4.6
9.  dotenv: ^16.0.0
10. express: ^4.17.2
11. express-winston: ^4.2.0
12. joi: ^17.6.0
13. jsonwebtoken: ^8.5.1
14. mongoose: ^6.1.4
15. validator: ^13.7.0
16. winston: ^3.5.1

## Примечания

- CORS

- Использование переменных окружения .env.

- Хранение токена в Cookie.

- Использование связей + статические функции **MongoDB**.

- Централизованный обработчик ошибок.

- Анализатор кода eslint.

**Адрес сервера:** https://api.va-mesto.ru
