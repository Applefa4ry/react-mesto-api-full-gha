const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const InvalidRequest = require('../errors/invalid-request');
const AuthError = require('../errors/auth-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const updateCfg = {
  new: true, // обработчик then получит на вход обновлённую запись
  runValidators: true, // данные будут валидированы перед изменением
  upsert: false, // если пользователь не найден, он будет создан
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send( data = { ...users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequest(''));
      } else {
        next(err);
      }
    });
};

const getUserData = (id, res, next) => {
  User.findById(id)
    .orFail(new NotFoundError('Такого пользователя не существует'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new InvalidRequest('Некорректный id пользователя'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  getUserData(req.user._id, res, next);
};

module.exports.getUser = (req, res, next) => {
  getUserData(req.params.userId, res, next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          res.send({
            email: user.email,
            avatar: user.avatar,
            name: user.name,
            about: user.about,
          });
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            next(new ConflictError('Такой пользователь уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new InvalidRequest('Некорректные данные при создании пользователя'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.editUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, updateCfg)
    .then((user) => res.send( user ))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InvalidRequest());
      } else {
        next(err);
      }
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, updateCfg)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InvalidRequest());
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ ...user, token });
    })
    .catch((err) => {
      if (err.name === 'AuthError' || err.message === 'Неправильные почта или пароль') {
        next(new AuthError('Неправильные почта или пароль'));
      } else {
        next(err);
      }
    });
};
