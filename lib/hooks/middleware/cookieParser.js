const cookieParser = require('cookie-parser');
const valueAt = require('../../util/valueAt');

const SECRET = 'cookie.secret';

/**
 * @param {object} app - Application Instance
 * @returns {function} Middleware function.
 */
module.exports = (app) => {
    const secret = valueAt(app.get('config'), SECRET);
    return secret
        ? cookieParser(secret)
        : cookieParser();
};
