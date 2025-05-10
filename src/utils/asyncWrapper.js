import { errorFactory } from './errorFactory.js';
import { Result } from './Result.js';
import { handleResult } from '../middlewares/handleResult.js';

export function asyncWrapper(controllerMethod) {
    return async (req, res) => {
        try {
            await controllerMethod(req, res);
        } catch (error) {
            console.error('Erro inesperado na controller:', error);

            const unexpectedError = Result.fail(
                errorFactory('InternalError', 'Erro inesperado no servidor.')
            );

            handleResult(unexpectedError, res);
        }
    };
}
