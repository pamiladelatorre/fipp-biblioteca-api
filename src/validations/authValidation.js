import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required()
});
