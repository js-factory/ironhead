/**
 * @description
 *
 * https://github.com/davidtheclark/cosmiconfig is being used to fetch the
 * rc file.
 *
 * * a package.json property
 * * a JSON or YAML, extensionless "rc file"
 * * an "rc file" with the extensions .json, .yaml, .yml, or .js.
 * * a .config.js CommonJS module
 *
 * ************************** OR ********************************************
 * One can pass it as a argument.
 * **************************************************************************
 */
const cosmiconfig = require('cosmiconfig');
const _ = require('lodash');

const defaultRc = require('../../config/defaultRC');


module.exports = (appName, appPath) => {
    const explorer = cosmiconfig(appName || 'ironhead');
    const result = explorer.searchSync();
    const { config, filepath } = result;
    const basePath = appPath || filepath;
    const conf = _.merge(defaultRc, config);

    return {
        ...conf,
        basePath
    };
};
