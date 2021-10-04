const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'some-secret-key' } = process.env;
const User = require('../models/user');
const AuthorizationError = require('../errors/authorizationError');
const IncorrectDataError = require('../errors/incorrectDataError');
const CheckRepeatEmailError = require('../errors/checkRepeatEmailError');
const NoFoundError = require('../errors/noFoundError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  if (req.body.email !== false || password !== false) {
    bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        User.create({
          email,
          password: hash,
          name,
          about,
          avatar,
        })
          .then((user) => {
            res.status(201).send(user);
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new IncorrectDataError('Переданы некорректные данные.'));
            } else if (err.code === 11000) {
              next(new CheckRepeatEmailError('При регистрации указан email, который уже существует на сервере.'));
            } else {
              next(err);
            }
          });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new IncorrectDataError('Переданы некорректные данные.'));
        } else {
          next(err);
        }
      });
  } else {
    next(new IncorrectDataError('Переданы некорректные данные.'));
  }
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new NoFoundError('Пользователь не найден.'));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  if (req.body.name !== false || req.body.about !== false) {
    User.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )
      .then((user) => {
        if (!user) {
          next(new NoFoundError('Пользователь не найден.'));
        } else {
          res.status(200).send(user);
        }
      })
      .catch((err) => {
        if (err.name === 'CastError' || err.name === 'ValidationError') {
          next(new IncorrectDataError('Переданы некорректные данные.'));
        } else {
          next(err);
        }
      });
  } else {
    next(new IncorrectDataError('Переданы некорректные данные.'));
  }
};

module.exports.updateAvatar = (req, res, next) => {
  if (req.body.name !== false || req.body.about !== false) {
    User.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )
      .then((user) => {
        if (!user) {
          next(new NoFoundError('Пользователь не найден.'));
        } else {
          res.status(200).send(user);
        }
      })
      .catch((err) => {
        if (err.name === 'CastError' || err.name === 'ValidationError') {
          next(new IncorrectDataError('Переданы некорректные данные.'));
        } else {
          next(err);
        }
      });
  } else {
    next(new IncorrectDataError('Переданы некорректные данные.'));
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);

      // вернём токен
      res.send({ token });
    })
    .catch(() => {
      next(new AuthorizationError('Неправильные почта или пароль'));
    });
};

module.exports.getOwner = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NoFoundError('Пользователь не найден.'));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};
