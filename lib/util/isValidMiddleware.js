const isObject = require('./isObject');
const isArray = require('./isArray');

/**
 * This function is used to check the validity of middleware object.
 * @param {*} middleware - Middleware Object that needs to be checked.
 * @returns {boolean} true|false
 */
const isValidMiddleware = middleware => isObject(middleware) && isArray(middleware.order);

module.exports = isValidMiddleware;
