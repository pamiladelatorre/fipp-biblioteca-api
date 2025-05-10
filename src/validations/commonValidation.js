// validations/commonValidation.js
import Joi from 'joi';

// Validação genérica para um ID numérico positivo
export const idParamSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'O ID deve ser um número.',
      'number.integer': 'O ID deve ser um número inteiro.',
      'number.positive': 'O ID deve ser maior que zero.',
      'any.required': 'O campo ID é obrigatório.'
    })
});

// Validação opcional para IDs de usuário (ex: em tokens, logs, etc)
export const userIdSchema = Joi.number()
  .integer()
  .positive()
  .messages({
    'number.base': 'O ID do usuário deve ser um número.',
    'number.integer': 'O ID do usuário deve ser um número inteiro.',
    'number.positive': 'O ID do usuário deve ser maior que zero.'
});

// Função auxiliar para aplicar em middlewares (útil para PATCH e filtros)
export const optionalIdSchema = Joi.number()
  .integer()
  .positive()
  .optional()
  .messages({
    'number.base': 'O ID deve ser um número.',
    'number.integer': 'O ID deve ser um número inteiro.',
    'number.positive': 'O ID deve ser maior que zero.'
});
