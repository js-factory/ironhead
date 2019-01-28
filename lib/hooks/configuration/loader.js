/**
 * Application default configuration.
 */
const appDefaultConf = require('../../../config/defaultConfig');
const fileExists = require('../../util/fileExists');

/**
 * @description
 * Loads application configurations provided by the user
 * merge default config with environment configs and provide
 * the final configs environment configs will override the
 * default configs.
 * @param {string} configPath Config Path from RC
 * @param {string} basePath Base Path from RC or passed
 * @returns {object} Merged Config Object.
 */
module.exports = (configPath) => {
    const env = process.env.NODE_ENV || 'development';

    const defaultPath = `${configPath}/config.js`;
    if (!fileExists(defaultPath)) throw new Error(`${defaultPath} file should exist`);
    const defaultConfig = require(defaultPath);

    const envPath = `${configPath}/env/${env}.js`;
    const envConfig = fileExists(envPath) ? require(envPath) : {};

    const viewConfPath = `${configPath}/views.js`;
    const viewConfig = fileExists(viewConfPath) ? require(viewConfPath) : {};

    return {
        ...appDefaultConf,
        ...defaultConfig,
        ...envConfig,
        viewConfig
    };
};
