/**
 *
 * View Hook
 * Application views attached to app namespace
 *
 * returns true|false
 */


const { HOOK_VIEW_EVENT } = require('../../../config/constants');

/**
 * @description
 * This function is used to configure the application configuration.
 * @param {*} viewsPath - Views Path
 * @returns {undefined} Undefined
 */
module.exports = function init(viewsPath) {
    let views = {};

    // IMPORTANT: view path is set at the express level
    // Here, app is the express app instance.
    this.app.set('views', viewsPath);

    try {
        views = require(viewsPath);
    } catch (_) {} // eslint-disable-line

    this.set('views', views);

    this.emit(HOOK_VIEW_EVENT);
};
