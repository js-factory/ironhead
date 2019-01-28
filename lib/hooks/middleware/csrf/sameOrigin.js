/**
 * @description Get the domain out of the origin header--
 * compare it to the host
 *
 * @param {object} req http request object
 * @param {boolean} strict flag
 * @returns {boolean} true|false
 */
const isSameOrigin = (req, strict) => {
    // If there's no origin header, consider it same origin unless
    // we're in strict mode
    if (!req.headers.origin) {
        return !strict;
    }

    // Get the domain and port out of the origin header
    const matches = req.headers.origin.match(/^https?:\/\/([^:]+)(:(\d+))?$/);
    // If the origin doesn't match the regex, consider it okay if we're not
    // in strict mode--this will allow non-http origins like "chrome-extension://"
    if (matches === null) {
        return !strict;
    }
    const [, domain, , port] = matches;

    // Compare it to the host
    return (req.host === domain && (!port || req.port === port));
};

module.exports = isSameOrigin;
