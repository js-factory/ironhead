/* eslint no-prototype-builtins: 0, complexity: [2, 11] */

let keyArray;
let resolved;
let index = 0;

/**
 *
 * @param {*} obj - Object
 * @param {*} keys - keys to fetch
 * @param {*} defaultVal - Default Value
 * @returns {*} Value
 */
const get = (obj, keys, defaultVal) => {
    resolved = obj;
    if (obj && (typeof keys === 'string')) {
        keyArray = keys.split('.');
        for (index = 0; index < keyArray.length; index += 1) {
            if (resolved && (typeof resolved.hasOwnProperty === 'function') && resolved.hasOwnProperty(keyArray[index])) {
                resolved = resolved[keyArray[index]]; // eslint-disable-line
            } else {
                resolved = defaultVal;
                break;
            }
        }
        return resolved;
    }
    return defaultVal;
};

module.exports = get;
