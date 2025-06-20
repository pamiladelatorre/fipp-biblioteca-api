import Joi from 'joi';

export const estadoUpdateSchema = Joi.object({
  estado: Joi.string()
  .required()
  .messages({
    'any.required': 'O campo estado é obrigatório.'
  })
});

export const baixaUpdateSchema = Joi.object({
  motivoBaixaId: Joi.number()
  .integer()
  .positive()
  .optional()
  .messages({
    'number.base': 'O ID motivo baixa deve ser um número.',
    'number.integer': 'O ID motivo baixa deve ser um número inteiro.',
    'number.positive': 'O ID motivo baixa deve ser maior que zero.'
  })
});
