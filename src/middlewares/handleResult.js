export const handleResult = (result, res, successStatus = 200, customMessage) => {
    if (!result.success) {
        const { status, message, type } = result.error;

        const errorResponse = {
            message: message || 'Erro desconhecido',
            type: type || 'Error',
            status: status || 400
        };

        return res.status(errorResponse.status).json(errorResponse);
    }

    if (successStatus === 204) {
        return res.status(204).end();
    }

    return res.status(successStatus).json({
        message: customMessage || 'Operação realizada com sucesso.',
        data: result.value
    });
};