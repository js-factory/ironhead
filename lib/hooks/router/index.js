/**
 * Router.
 * A plugin to attach routes.
 */
const { router } = require('@js-factory/router');
const isArray = require('../../util/isArray');
const { HOOK_ROUTER_EVENT } = require('../../../config/constants');
const routerInstance = require('../../app/instance');

/**
 * This function is used to attach the routes.
 * @param {*} routesPath - Routes Path Array
 * @returns {undefined} Undefined
 */
module.exports = function init(routesPath) {
    const routes = require(routesPath);
    if (!isArray(routes)) {
        throw new Error(`Please specify the array of routes. Received ${routes}`);
    }

    const finalRoutes = router(routes);

    Object
        .keys(finalRoutes)
        .forEach((route) => {
            const { [route]: chain } = finalRoutes;
            const [method, url] = route.split(' ');
            routerInstance.router()[method.toLowerCase()](url, chain);
        });

    this.emit(HOOK_ROUTER_EVENT);
};
