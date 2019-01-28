const IronHead = require('../ironhead');

/**
 * @description
 * This function is an ironhead factory function which return the ironhead
 * application instance.
 *
 * @returns {object} Ironhead Instance.
 */
const IronHeadFactory = () => new IronHead();

module.exports = IronHeadFactory;
