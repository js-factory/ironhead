/**
 *
 * Configuration Hook
 * Application configurations attached to app namespace
 *
 * returns true|false
 */

const loader = require('./loader');
const { HOOK_CONFIGURATION_EVENT } = require('../../../config/constants');

/**
 * @description
 * This function is used to configure the application configuration.
 * @param {*} configPath - Configuration Path
 * @returns {undefined} Undefined
 */
function init(configPath) {
    const config = loader(configPath);
    this.set('config', config);

    // adding config to express so that other module can used it without having access to ironhead
    this.app.set('config', config);

    // Hook Configuration Event Emitted
    this.emit(HOOK_CONFIGURATION_EVENT);
}

module.exports = init;
