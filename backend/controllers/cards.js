const Card = require('../models/card');
const CheckOwnerCardError = require('../errors/checkOwnerCardError');
const IncorrectDataError = require('../errors/incorrectDataError');
const NoFoundError = require('../errors/noFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  if (name !== false || link !== false) {
    Card.create({ name, link, owner })
      .then((card) => {
        res.status(201).send(card);
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

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        next(new NoFoundError('Карточка не найдена.'));
      } else if (req.user._id === String(card.owner)) {
        Card.findByIdAndDelete(req.params.id)
          .then((deletedCard) => {
            if (req.user._id !== String(deletedCard.owner)) {
              next(new CheckOwnerCardError('Вы не автор данной карточки'));
            } else {
              res.status(200).send(deletedCard);
            }
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new IncorrectDataError('Переданы некорректные данные.'));
            } else {
              next(err);
            }
          });
      } else {
        next(new CheckOwnerCardError('Вы не автор данной карточки'));
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

module.exports.likeCard = (req, res, next) => {
  if (req.body.name !== false || req.body.link !== false) {
    Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      {
        new: true,
      },
    )
      .then((card) => {
        if (!card) {
          next(new NoFoundError('Карточка не найдена.'));
        } else {
          res.status(200).send(card);
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new IncorrectDataError('Переданы некорректные данные.'));
        } else {
          next(err);
        }
      });
  } else {
    next(new IncorrectDataError('Переданы некорректные данные.'));
  }
};

module.exports.dislikeCard = (req, res, next) => {
  if (req.body.name !== false || req.body.link !== false) {
    Card.findByIdAndUpdate(req.params.id,
      { $pull: { likes: req.user._id } },
      {
        new: true,
      })
      .then((card) => {
        if (!card) {
          next(new NoFoundError('Карточка не найдена.'));
        } else {
          res.status(200).send(card);
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new IncorrectDataError('Переданы некорректные данные.'));
        } else {
          next(err);
        }
      });
  } else {
    next(new IncorrectDataError('Переданы некорректные данные.'));
  }
};
