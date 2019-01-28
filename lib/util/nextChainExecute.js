/**
 * @description
 * This fun
 * @param {*} chain - Chain containing the functions.
 * @param {*} props - Props/Arguments for the chain
 * @param {*} cb - Callback executed after the chain.
 * @returns {undefined} Undefined
 */
module.exports = function init(chain, props, cb) {
    let i = 0;

    /**
     * This function is used to execute the task in the chain.
     * @param {object} err Error Object
     * @returns {undefined} Undefined
     */
    function next(err) {
        if (err) throw err;
        i += 1;
        if (i < chain.length) return nextChain(); // eslint-disable-line
        return cb && cb();
    }

    /**
     * This function is used to execute the task in the chain.
     * @returns {undefined} Undefined
     */
    function nextChain() {
        const { [i]: fn } = chain;
        fn.apply(null, [...props, next]);
    }

    nextChain();
};
