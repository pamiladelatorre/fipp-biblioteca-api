import Joi from 'joi';

// Regras comuns reutilizáveis
const descricao = Joi.string()
  .trim()
  .min(3)
  .max(100)
  .required()
  .messages({
    'string.base': 'A descrição deve ser um texto.',
    'string.empty': 'A descrição não pode estar vazia.',
    'string.min': 'A descrição deve ter no mínimo {#limit} caracteres.',
    'string.max': 'A descrição deve ter no máximo {#limit} caracteres.',
    'any.required': 'O campo descrição é obrigatório.'
  });

const ativo = Joi.boolean().required().messages({
  'boolean.base': 'O campo "ativo" deve ser verdadeiro ou falso.',
  'any.required': 'O campo "ativo" é obrigatório.'
});

export const categoriaCreateSchema = Joi.object({
  descricao,
  ativo
});

export const categoriaUpdateSchema = Joi.object({
  descricao,
  ativo
});

export const categoriaAtivoSchema = Joi.object({
  ativo
});
