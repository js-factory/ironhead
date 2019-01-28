/* eslint complexity: [2, 8] */

const isValidMiddleware = require('../../util/isValidMiddleware');
const { HOOK_MIDDLEWARE_EVENT } = require('../../../config/constants');

const router = require('./router');

const middieList = [
    './attachParams'
];

/**
 * @description
 * This function is used to attach the Middleware
 * @param {*} middlewarePath - Middleware path
 * @returns {undefined} Undefined
 */
module.exports = function init(middlewarePath) {
    const { app } = this;
    const middleware = require(middlewarePath);
    if (!isValidMiddleware(middleware)) {
        throw new Error(`Middleware Object at path ${middlewarePath} is not valid`);
    }
    const { order, ...rest } = middleware;

    [...middieList, ...order].forEach((mdw) => {
        switch (mdw) {
        case 'router':
            router(app);
            break;
        case 'cookieParser':
            app.use(require('./cookieParser')(this));
            break;
        case 'static':
            require('./static').call(this);
            break;
        case 'csrf':
            app.use(require('./csrf'));
            break;
        default: {
            const fn = rest[mdw] || require(mdw)(this);
            app.use(fn);
        }
        }
    });

    // Middleware Event emitted
    this.emit(HOOK_MIDDLEWARE_EVENT);
};
