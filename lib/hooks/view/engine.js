/**
 *
 * View Hook
 * Application views attached to app namespace
 *
 * returns true|false
 */

const { HOOK_VIEW_ENGINE_EVENT } = require('../../../config/constants');
const isObject = require('../../util/isObject');

/**
 * @description
 * This function is used to configure the application configuration.
 * @param {*} viewsPath - Views Path
 * @returns {undefined} Undefined
 */
module.exports = function init() {
    const { viewConfig } = this.get('config');
    if (isObject(viewConfig) && viewConfig.engine) {
        this.set('view engine', viewConfig.engine);

        // IMPORTANT: view engine is set at the express level
        // Here, app is the express app instance.
        this.app.set('view engine', viewConfig.engine);

        this.emit(HOOK_VIEW_ENGINE_EVENT);
    }
};
