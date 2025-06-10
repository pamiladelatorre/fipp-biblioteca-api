import Joi from 'joi';

// Regras reutilizáveis
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

const ativo = Joi.boolean().required().messages({
  'boolean.base': 'O campo "ativo" deve ser verdadeiro ou falso.',
  'any.required': 'O campo "ativo" é obrigatório.'
});

// Schemas
export const assinaturaCreateSchema = Joi.object({
  dataInicio,
  dataFim,
  usuarioId,
  ativo
});

export const assinaturaUpdateSchema = Joi.object({
  dataInicio,
  dataFim,
  usuarioId,
  ativo
});

export const assinaturaAtivoSchema = Joi.object({
  ativo
});
