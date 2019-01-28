const instance = require('../../app/instance').router();

/**
 * @description
 * This function is used to associate router.
 * @param {*} app - Application Instance
 * @returns {*} *
 */
const router = app => app.use('/', instance);

module.exports = router;
