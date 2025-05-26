/**
 * Converte nomes de campos camelCase para snake_case.
 * Ex: "nomeComposto" → "nome_composto"
 * @param {string} str
 * @returns {string}
 */
export function camelToSnake(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

const toNull = (val) => (val === '' ? null : val);

export {
    toNull
}