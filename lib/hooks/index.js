/**
 * Hooks
 *
 * All the application level hooks are attached here.
 *
 * Following hooks are used:
 *
 * `configuration` defines application configurations. It supports environment based variables too.
 *
 * `middlewares` are express like middlewares in the request-response journey.
 *
 * `router` defines application routes and it's handler.
 *
 * `userhooks` defines custom user hooks
 */
const config = require('./configuration');
const middleware = require('./middleware');
const router = require('./router');
const userhooks = require('./userhooks');
const view = require('./view');
const viewEngine = require('./view/engine');

/**
 * This function is used to initiate the hooks.
 * @param {*} rcConfig - Application RC Config.
 * @param {*} cb - Callback which needs to be executed to bind
 * the application.
 * @returns {undefined} Undefined
 */
module.exports = function init(rcConfig, cb) {
    const {
        paths: {
            config: configPath,
            middleware: middlewarePath,
            routes,
            hooks,
            views
        },
        basePath
    } = rcConfig;

    // Config Association
    config.call(this, `${basePath}${configPath}`);

    // View Association if exists
    if (views) view.call(this, `${basePath}${views}`);

    // View Engine Association
    viewEngine.call(this);

    // Middleware Association
    middleware.call(this, `${basePath}${middlewarePath}`);

    // Router Association
    router.call(this, `${basePath}${routes}`);

    // Hooks Association if exists
    if (hooks) return userhooks.call(this, `${basePath}${hooks}`, cb);

    return cb();
};
