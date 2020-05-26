/* eslint complexity: [2, 15], max-statements: [2, 20] */
/**
 * Router.
 * A plugin to attach routes.
 */
const { router } = require('@js-factory/router');
const isArray = require('../../util/isArray');
const { HOOK_ROUTER_EVENT } = require('../../../config/constants');
const routerInstance = require('../../app/instance');

const defaultHandler = (req, res, next) => next();

/**
 * This function is used to attach the routes.
 * @param {*} routesPath - Routes Path Array
 * @returns {undefined} Undefined
 */
module.exports = function init(routesPath) {
    const { gateway, responseFactory = defaultHandler } = this.app.get('config');
    const options = {};
    const routes = require(routesPath);
    if (!isArray(routes)) {
        throw new Error(`Please specify the array of routes. Received ${routes}`);
    }

    if (gateway) {
        Object.assign(options, { gateway });
    }

    const finalRoutes = router(routes, options);

    Object
        .keys(finalRoutes)
        .forEach((route) => {
            const { [route]: chain } = finalRoutes;
            const [method, url] = route.split(' ');
            routerInstance.router()[method.toLowerCase()](url, chain, responseFactory);
        });

    this.emit(HOOK_ROUTER_EVENT);
};
