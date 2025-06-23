import e from 'express';
import Joi from 'joi';
const dataInicio = Joi.date().required().messages({
  'date.base': 'A data de início deve ser uma data válida.',
  'any.required': 'O campo "dataInicio" é obrigatório.'
});

const dataFim = Joi.date().min(Joi.ref('dataInicio')).required().messages({
  'date.base': 'A data de fim deve ser uma data válida.',
  'date.min': 'A data de fim não pode ser anterior à data de início.',
  'any.required': 'O campo "dataFim" é obrigatório.'
});

const usuarioId = Joi.number().integer().positive().required().messages({
  'number.base': 'O campo "usuarioId" deve ser um número inteiro.',
  'number.integer': 'O campo "usuarioId" deve ser um número inteiro.',
  'number.positive': 'O campo "usuarioId" deve ser um número positivo.',
  'any.required': 'O campo "usuarioId" é obrigatório.'
});

export const infracaoCreateSchema = Joi.object({
  dataInicio,
  dataFim,
  usuarioId,
});