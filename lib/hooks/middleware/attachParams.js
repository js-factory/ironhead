const view = require('./view');

/**
 * Middleware to add cache control header to all the incoming requests
 * This is default cache controller middleware sets default caching to 0
 *
 * @param {object} app - Application Instance
 * @param {object} req - Request Object
 * @param {object} res - Res Object
 * @param {function} next - Next Function
 * @returns {undefined} Undefined
 */
module.exports = app => (req, res, next) => {
    // Parameters Attach at the `req` scope
    // Request Config & URL Parameters
    req.getConfig = key => (!key ? app.get('config') : app.get('config')[key]);
    req.getFromUrl = key => req._parsedUrl[key]; // eslint-disable-line

    // Res object associations
    res.view = view(app).bind(res);
    res.locals = res.locals || {};

    next();
};
