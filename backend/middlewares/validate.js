const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const checkUrl = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }

  throw new Error('URL validation err');
};

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(checkUrl),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(checkUrl),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(checkUrl).required(),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

const validateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required(),
    about: Joi.string().min(2).required(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateAvatar,
  validateCreateCard,
  validateId,
  validateUserData,
};
