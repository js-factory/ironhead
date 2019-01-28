/**
 * Middleware
 *
 * Cross-Site Request Forgery Protection
 *
 * CSRF Defense:
 * Double submit cookie implementation
 *
 * Cross-Site Request Forgery (CSRF) is a type of attack that occurs
 * when a malicious web site, email, blog, instant message, or program
 * causes a user’s web browser to perform an unwanted action on a trusted
 * site for which the user is currently authenticated. The impact of a
 * successful CSRF attack is limited to the capabilities exposed by the vulnerable application.
 * For example, this attack could result in a transfer of funds, changing a password,
 * or purchasing an item in the user's context. In effect, CSRF attacks are used by an
 * attacker to make a target system perform a function via the target's browser without
 * knowledge of the target user, at least until the unauthorized transaction has been committed.
 *
 * Source: Wikipedia
 *
 * When enabled, all non-GET requests to the server must be accompanied by
 * a special token, identified as the '_csrf' parameter.
 *
 * This option protects your application against cross-site request forgery (or CSRF) attacks.
 * A would-be attacker needs not only a user's session cookie, but also this timestamped,
 * secret CSRF token, which is refreshed/granted when the user visits a URL on your app's domain.
 *
 * This allows us to have certainty that our users' requests haven't been hijacked,
 * and that the requests they're making are intentional and legitimate.
 *
 * This token has a short-lived expiration timeline, and must be acquired by either:
 *
 * (a)        For traditional view-driven web apps:
 *            Fetching it from one of your views, where it may be accessed as
 *            a local variable, e.g.:
 *            <form>
 *                <input type="hidden" name="_csrf" value="<%= _csrf %>" />
 *            </form>
 *
 * or (b)    For AJAX/Socket-heavy and/or single-page apps:
 *            Sending a GET request to the `/csrfToken` route, where it will be returned
 *            as JSON, e.g.:
 *            { _csrf: 'ajg4JD(JGdajhLJALHDa' }
 *
 *
 * Enabling this option requires managing the token in your front-end app.
 * For traditional web apps, it's as easy as passing the data from a view into a form action.
 * In AJAX/Socket-heavy apps, just send a GET request to the /csrfToken route to get a valid token.
 *
 * For more information on CSRF, check out:
 * http://en.wikipedia.org/wiki/Cross-site_request_forgery
 *
 * Source: Sails.js
 */

/** **************************************************************************
 *                                                                           *
 * Enabled CSRF protection for your site?                                    *
 *                                                                           *
 *************************************************************************** */

/** **************************************************************************
 * You may also specify more fine-grained settings for CSRF, including the   *
 * domains which are allowed to request the CSRF token via AJAX. These       *
 * settings override the general CORS settings in your config/cors.js file.  *
 *                                                                           *
 *************************************************************************** */

const csrf = require('csurf');
const isSameOrigin = require('./sameOrigin');

// @todo provide security config where these configs can be provided
const CSRF_TOKEN_KEY = '_csrf';
const cookie = { key: '__tk__', signed: true };

module.exports = (req, res, next) => csrf({ cookie })(req, res, (err) => {
    if (err) {
        // Only attempt to handle invalid csrf tokens
        if (err.code !== 'EBADCSRFTOKEN') {
            throw err;
        }
        // @todo add custom error handler module instead.
        return res.status(403).send('CSRF mismatch');
    }

    if (isSameOrigin(req)) {
        res.locals[CSRF_TOKEN_KEY] = req.csrfToken();
    } else {
        res.locals[CSRF_TOKEN_KEY] = null;
    }

    return next();
});
