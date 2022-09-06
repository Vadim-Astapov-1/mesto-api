const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/unauthorized-error');

// const regex = /^https?:\/\/[a-z0-9.-]+(\/\S+)*/gi;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (avatar) => validator.isURL(avatar),
      message: 'Передана некорректная ссылка на изображение',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Передан некорректный E-Mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUser = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (matched) {
              return user;
            }

            throw new UnauthorizedError('Неправильные почта или пароль');
          });
      }

      throw new UnauthorizedError('Неправильные почта или пароль');
    });
};

module.exports = mongoose.model('user', userSchema);
