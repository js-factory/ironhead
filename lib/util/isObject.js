/**
 * @description
 * This function is used to check whether the given source is an
 * Object or not.
 * @param {*} source - Source that needs to be checked.
 * @returns {boolean} true|false
 */
const isObject = source => Object.prototype.toString.call(source) === '[object Object]';

module.exports = isObject;
