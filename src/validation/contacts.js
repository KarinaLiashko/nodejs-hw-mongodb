import Joi from 'joi';

import { typeList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    'any.required': `треба вказати ім'я`,
  }),
  phoneNumber: Joi.string().required().min(3).max(20).messages({
    'any.required': `треба вказати номер телефону`,
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'any.required': `треба вказати імейл`,
  }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid(...typeList),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  phoneNumber: Joi.string(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid(...typeList),
});
