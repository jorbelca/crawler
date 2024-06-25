/**
 * Verifica si el valor es un string.
 * @param {any} value - El valor a verificar.
 * @returns {boolean} - Retorna true si el valor es un string.
 */
const isString = (string) => {
  return typeof string === "string";
};

/**
 * Verifica si el valor es una fecha válida.
 * @param {string} date - La fecha a verificar.
 * @returns {boolean} - Retorna true si la fecha es válida.
 */

const isDate = (date) => {
  return Boolean(Date.parse(date));
};

/**
 * Verifica si el valor es un número.
 * @param {any} value - El valor a verificar.
 * @returns {boolean} - Retorna true si el valor es un número.
 */
const isNumber = (number) => {
  return typeof number === "number";
};

export default { isString, isDate, isNumber };
