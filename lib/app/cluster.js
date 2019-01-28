/**
 ************************ CLUSTER ***********************
 * Here, is a wrapper to create a cluster for Node based
 * on the environment.
 ********************************************************
 * Node Cluster Module:
 * Here, we are using cluster module.
 *
 */

const cluster = require('cluster');
const os = require('os');

/**
 * @description
 * This function is used to check whether to initiate the cluster.
 * @returns {boolean} true|false
 */
const isEnabled = ({ cluster: clusterConfig = true }) => clusterConfig
    && !!(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging')
    && cluster.isMaster;

/**
 * @description
 * This function is used to check whether to initiate the cluster.
 * @param {object} app - Application Object.
 * @returns {nothing} - Empty
 */
const init = () => {
    const { length: cpuCount } = os.cpus();

    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    // Listen for dying workers
    cluster.on('exit', (worker) => {
        console.log(`Worker with id : ${worker.id} died :(`);
        cluster.fork();
    });
};

module.exports = {
    init,
    isEnabled
};
