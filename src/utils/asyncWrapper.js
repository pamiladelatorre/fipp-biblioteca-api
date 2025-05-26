import { errorFactory } from './errorFactory.js';
import { Result } from './Result.js';
import { handleResult } from '../middlewares/handleResult.js';
import { ValidationError } from './errors.js';

export function asyncWrapper(controllerMethod) {
    return async (req, res) => {
        try {
            await controllerMethod(req, res);
        } catch (error) {
            if (error instanceof ValidationError) {
                // é erro tratado, pode responder de forma customizada
                return handleResult(Result.fail(errorFactory(error.name, error.message)), res);
            } 
            
            console.error('Erro inesperado na controller:', error);

            const unexpectedError = Result.fail(
                errorFactory('InternalError', 'Erro inesperado no servidor.')
            );

            handleResult(unexpectedError, res);
        }
    };
}
