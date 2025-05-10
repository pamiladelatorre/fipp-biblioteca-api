import { Result } from './Result.js';
import { errorFactory } from './errorFactory.js';

export function normalizeToBit(value) {
  return (value === true || value === 'true' || value === 1 || value === '1') ? 1 : 0;
}

/**
 * Retorna um erro padronizado do tipo "NotFound" caso o item informado seja nulo ou undefined.
 *
 * @param {*} item - O item a ser validado.
 * @param {string} modelName - Nome da entidade associada ao item (ex: 'Usuário', 'Produto').
 * @param {'a'|'o'} articleSuffix - Gênero gramatical da entidade: 'a' para feminino, 'o' para masculino.
 * @returns {Result} - Result.ok(item) se o item for válido, ou Result.fail com erro "NotFound".
 */
export function notFoundIfNull(item, modelName = 'Modelo', articleSuffix = 'o') {
  if (item == null) {
    return Result.fail(errorFactory('NotFound', `${modelName} não encontrad${articleSuffix}.`));
  }
  return Result.ok(item);
}

/**
 * Retorna um erro padronizado do tipo "NotFound" caso a lista informada seja nula ou esteja vazia.
 * Suporta personalização gramatical com base no gênero da entidade.
 *
 * @param {Array} list - Lista a ser validada.
 * @param {string} modelName - Nome da entidade no singular (ex: 'Categoria', 'Produto').
 * @param {'a'|'o'} articleSuffix - Gênero gramatical da entidade: 'a' para feminino, 'o' para masculino.
 * @returns {Result} - Result.ok(lista) se a lista tiver itens, ou Result.fail com erro "NotFound".
 */
export function notFoundIfEmpty(list, modelName = 'Modelo', articleSuffix = 'o') {
  if (!list || list.length === 0) {
    const article = articleSuffix === 'a' ? 'Nenhuma' : 'Nenhum';
    const message = `${article} ${modelName.toLowerCase()} localizad${articleSuffix}.`;

    return Result.fail(errorFactory('NotFound', message));
  }

  return Result.ok(list);
}

/**
 * Valida se um valor é uma string não vazia.
 *
 * @param {string} value - Valor a ser validado.
 * @param {string} nameField - Nome do campo para mensagens de erro (ex: 'Nome', 'Descrição').
 * @param {'a'|'o'} articleSuffix - Gênero gramatical da entidade: 'a' para feminino, 'o' para masculino.
 * @returns {Result} - Result.ok() se a string for válida, ou Result.fail com erro "BadRequest".
 */
export function validateRequiredString(value, nameField = 'Campo', articleSuffix = 'o') {
  if (typeof value !== 'string' || value.trim() === '') {
    return Result.fail(errorFactory('BadRequest', `${nameField} é obrigatóri${articleSuffix}.`));
  }
  return Result.ok();
}

/**
 * Valida se uma string possui um tamanho mínimo exigido.
 *
 * @param {string} value - Valor a ser verificado.
 * @param {number} minLength - Comprimento mínimo exigido.
 * @param {string} nameField - Nome do campo para mensagens de erro.
 * @returns {Result} - Result.ok() se o valor atender ao tamanho mínimo, ou Result.fail com erro "BadRequest".
 */
export function validateMinLength(value, minLength, nameField = 'Campo') {
  if (value.trim().length < minLength) {
    return Result.fail(errorFactory('BadRequest', `${nameField} deve ter no mínimo ${minLength} caracteres.`));
  }
  return Result.ok();
}