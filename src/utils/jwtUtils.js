import jwt from 'jsonwebtoken';

const EXPIRES_IN = '6h'; // ou '1d', '15m', etc.

function getSecretKey() {
    const SECRET_KEY = process.env.JWT_SECRET;
    if (!SECRET_KEY) {
        throw new Error('JWT_SECRET não está definido no .env!');
    }
    return SECRET_KEY;
};

/**
 * Gera um token JWT com o payload informado
 * @param {object} payload
 * @returns {string} token
 */
function generateToken(payload) {
    return jwt.sign(payload, getSecretKey(), { expiresIn: EXPIRES_IN });
};

/**
 * Verifica e valida o token (assinatura e expiração)
 * @param {string} token JWT limpo (sem "Bearer ")
 * @returns {object|null} payload decodificado ou null se inválido
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, getSecretKey());
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new Error('Token expirado');
        } else if (err.name === 'JsonWebTokenError') {
            throw new Error('Token inválido');
        } else {
            throw new Error('Erro ao verificar o token');
        }
    }
}

/**
 * Apenas decodifica o token (sem verificar validade/assinatura)
 * @param {string} token
 * @returns {object|null}
 */
function decodeToken(token) {
    return jwt.decode(token);
}

export {
    generateToken,
    verifyToken,
    decodeToken
};