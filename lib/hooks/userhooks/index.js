const isArray = require('../../util/isArray');
const nextChainExecute = require('../../util/nextChainExecute');
const { HOOK_USERHOOK_EVENT } = require('../../../config/constants');

/**
 * This function is used to initiate the hooks.
 * @param {*} hooksPath - User hooks Path.
 * @param {*} cb - Callback which needs to be executed to bind
 * the application.
 * @returns {undefined} Undefined
 */
module.exports = function init(hooksPath, cb) {
    const hooks = require(hooksPath);

    if (!isArray(hooks) || hooks.length === 0) {
        throw new Error(`${hooks} should be an Array with Values. Received ${hooks}`);
    }

    nextChainExecute(hooks, [this], () => {
        this.emit(HOOK_USERHOOK_EVENT);
        cb();
    });
};
