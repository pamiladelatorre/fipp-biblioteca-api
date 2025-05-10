export function errorFactory(type, message) {
    const types = {
        ValidationError: 422,
        Conflict: 409,
        NotFound: 404,
        Unauthorized: 401,
        Forbidden: 403,
        InternalError: 500,
        BadRequest: 400
    };

    const safeType = typeof type === 'string' ? type : 'BadRequest';

    return {
        type: safeType,
        message: message || 'Erro desconhecido',
        status: types[safeType] || 400
    };
};