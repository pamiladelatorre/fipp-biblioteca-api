/**
 * Serializa uma instância de classe pegando todos os getters da cadeia de protótipos,
 * garantindo que o campo "id" apareça primeiro, se existir.
 *
 * @param {object} obj - Instância a ser serializada.
 * @param {string[]} [excluir=[]] - Lista de chaves a excluir do resultado.
 * @returns {object} Objeto plano com os valores dos getters.
 */
export function toJSONFromGetters(obj, excluir = []) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error("O argumento deve ser um objeto válido.");
  }

  const getters = [];
  let proto = Object.getPrototypeOf(obj);

  // Itera pela cadeia de protótipos para pegar os getters
  while (proto && proto !== Object.prototype) {
    const descriptors = Object.getOwnPropertyDescriptors(proto);

    // Adiciona os getters à lista, mas evita adicionar se já estiver na lista
    for (const [key, desc] of Object.entries(descriptors)) {
      if (typeof desc.get === 'function' && !getters.includes(key)) {
        getters.push(key);
      }
    }

    proto = Object.getPrototypeOf(proto);
  }

  // Remove as chaves a serem excluídas
  const filteredKeys = getters.filter(key => !excluir.includes(key));

  // Organiza as chaves: "id" vem primeiro, depois o restante
  const orderedKeys = filteredKeys.sort((a, b) => {
    if (a === 'id') return -1;  // "id" sempre vem primeiro
    if (b === 'id') return 1;
    return 0;
  });

  // Retorna um objeto com os valores dos getters
  return orderedKeys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
}