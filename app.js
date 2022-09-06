const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const { celebrate, Joi, errors } = require('celebrate');

const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const validateUrl = require('./middlewares/validateUrl');
const logout = require('./middlewares/logout');

const NotFoundError = require('./errors/not-found-error');

const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

const allowedCors = [
  'https://va-mesto.ru',
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/mestodb')
  .catch((err) => {
    console.log(err);
  });

app.use(cookieParser());
app.use(requestLogger);

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    res.end();
  }

  next();
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.get('/signout', logout);

app.use('/users', require('./routers/users'));
app.use('/cards', require('./routers/cards'));

app.use((req, res, next) => {
  next(new NotFoundError(`Ресурс по адресу ${req.path} не найден`));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`port: ${PORT}`);
});
