const util = require('util');
const { EventEmitter } = require('events');

const rc = require('../rc');
const hooks = require('../hooks');
const { instance, cluster } = require('../app');
const { APPLICATION_BINDED_EVENT } = require('../../config/constants');


/**
 * Application Class
 */
class IronHead {
    /**
     * Ironhead's Constructor.
     */
    constructor() {
        // Our App Instance.
        this.instance = instance;

        // Underlying Framework Application Instance, Currently EXPRESS.
        this.app = {};

        this.locals = {};

        // Remove memory-leak warning about max listeners
        // See: http://nodejs.org/docs/latest/api/events.html#events_emitter_setmaxlisteners_n
        this.setMaxListeners(0);
    }

    /**
     * @description
     * This function is used to set the application locals
     * key associated to the application.
     *
     * @param {*} setting - Settings key
     * @param {*} val - Setting value
     * @returns {undefined}
     */
    set(setting, val = {}) {
        this.locals[setting] = val;
    }

    /**
     * @description
     * This function is used to get the application locals
     * key associated to the application.
     *
     * @param {*} setting - Local Settings key
     * @returns {*} Local Settings value
     */
    get(setting = '') {
        return this.locals[setting] || {};
    }

    /**
     * @description
     * This function is used to run the Application and attaching the necessary
     * hooks
     *
     * @param {*} appName - Application Name for fetching RC
     * @param {*} appPath - Application base path
     * @returns {*} Nothing
     */
    run(appName, appPath) {
        const rcConfig = rc(appName, appPath);
        if (!rcConfig.basePath) throw new Error('Application Base Path Need to exists');

        if (cluster.isEnabled(rcConfig)) return cluster.init();

        this.app = this.instance.get();

        return hooks.call(this, rcConfig, () => {
            const { port } = this.get('config');
            this.instance.bind(
                port,
                () => this.emit(APPLICATION_BINDED_EVENT, { port })
            );
        });
    }
}

/* Associating EventEmitter so that custom events can be
 * emitted like: HOOKS EVENTS, APPLICATION BINDED etc.
 */
util.inherits(IronHead, EventEmitter);

module.exports = IronHead;
