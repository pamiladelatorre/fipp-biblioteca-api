import { camelToSnake } from "./stringUtils.js";

/**
 * Extrai os dados públicos de uma entidade usando apenas os getters da classe atual.
 * Ideal para salvar no banco de dados.
 *
 * @param {object} entity - Instância da entidade
 * @param {string[]} excluir - Campos a excluir (ex: ['id'])
 * @returns {object} Objeto com campos extraídos
 */
export function extractEntityDataForDb(entity, excluir = [], incluirHerdados = false) {
  const result = {};
  const visitados = new Set();
  let proto = Object.getPrototypeOf(entity);

  // const camelToSnake = (str) =>
  //   str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

  while (proto && proto !== Object.prototype) {
    const descriptors = Object.getOwnPropertyDescriptors(proto);

    for (const [key, desc] of Object.entries(descriptors)) {
      if (typeof desc.get === 'function' && !excluir.includes(key) && !visitados.has(key)) {
        const snakeKey = camelToSnake(key);
        result[snakeKey] = entity[key];
        visitados.add(key);
      }
    }

    if (!incluirHerdados) break;
    proto = Object.getPrototypeOf(proto);
  }

  return result;
}