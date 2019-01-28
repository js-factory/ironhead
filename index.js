const IronHeadFactory = require('./lib/factory/ironhead');

/* App Single Instance to be used by the application */
const ironhead = IronHeadFactory();

module.exports = ironhead;
