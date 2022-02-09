const Joi = require('joi');

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const signUpSchema = Joi.object({
  name: Joi.string().required().max(50),
  email: Joi.string().required().email().max(70),
  pass: Joi.string().required().regex(passwordPattern).min(6).max(20),
  dob: Joi.string().isoDate(),
});

const signInSchema = Joi.object({
  email: Joi.string().required().email().max(70),
  pass: Joi.string().required().regex(passwordPattern).min(6)
    .max(20),
});

const createUserSchema = Joi.object({
  name: Joi.string().required().max(50),
  email: Joi.string().required().email().max(70),
  pass: Joi.string().required().regex(passwordPattern).min(6).max(20),
  dob: Joi.string().isoDate(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().required().max(50),
  email: Joi.string().required().email().max(70),
  dob: Joi.string().isoDate(),
});

module.exports = {
  signUpSchema,
  signInSchema,
  createUserSchema,
  updateUserSchema,
};