const fs = require('fs');

/**
 * This function is used to check whether the file exists or not.
 * @param {string} source File Source.
 * @returns {undefined}
 */
const fileExists = source => fs.existsSync(source);

module.exports = fileExists;
