import { Result } from '../utils/Result.js';
import { handleResult } from './handleResult.js';

/**
 * Middleware para validar dados de entrada (body, query ou params)
 * 
 * @param {'body'|'query'|'params'} property - A propriedade da requisição a ser validada
 * @param {Joi.Schema} schema - Schema Joi correspondente
 */
export const validate = (property, schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], {
            abortEarly: false, // Captura todos os erros (não só o primeiro)
            convert: true,     // Converte tipos automaticamente se possível (ex: "1" → 1)
            stripUnknown: true // Remove campos não definidos no schema
        });

        if (error) {
            const messages = error.details.map(detail => detail.message).join(', ');
            const result = Result.fail({
                type: 'ValidationError',
                message: messages,
                status: 422
            });
            return handleResult(result, res);
        }

        next();
    };
};
