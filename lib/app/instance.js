const express = require('express');

const routerInstance = express.Router();
const { static: staticServer } = express;

// Application Instance
let app;

/**
 * @description
 * This function is used to return the fasitify instance.
 * @returns {object} Application Instance.
 */
const get = () => {
    if (!app) {
        app = express();
        return app;
    }
    return app;
};

/**
 * This function is used to bind the application on a port.
 * @param {number} port Application port.
 * @param {function} cb Callback.
 * @returns {*} Undefined.
 */
const bind = (port, cb) => app.listen(port, cb);

/**
 * This function is used to get the router.
 * @returns {*} Undefined.
 */
const router = () => routerInstance;

module.exports = {
    bind,
    get,
    router,
    staticServer
};
