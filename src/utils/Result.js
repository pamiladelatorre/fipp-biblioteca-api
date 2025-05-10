import { errorFactory } from './errorFactory.js';

export class Result {
    constructor(success, value = null, error = null) {
        this.success = success;
        this.value = value;
        this.error = error;
    }

    static ok(value) {
        return new Result(true, value, null);
    }

    /**
     * Cria um resultado de erro padronizado.
     * @param {string|object} error - Mensagem simples ou objeto contendo message, type e status.
     * @param {string} [type='BadRequest'] - Tipo HTTP padrão (usado apenas se error for string).
     * @returns {Result}
     */
    static fail(error, type = 'BadRequest') {
        if (typeof error === 'string') {
            return new Result(false, null, errorFactory(type, error));
        }

        const base = errorFactory(type);
        const finalError = {
            type: error.type || base.type,
            message: error.message || base.message,
            status: error.status || base.status
        };

        return new Result(false, null, finalError);
    }

    isSuccess() {
        return this.success === true;
    }

    isFailure() {
        return this.success === false;
    }
}