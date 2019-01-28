
const defaultOptions = {
    root: 'public',
    options: {
        maxAge: 0
    }
};

/**
 * Static middleware to server static files
 * @returns {undefined}
 */
function staticServer() {
    const { static: staticConfig = {} } = this.app.get('config');
    const settings = { ...defaultOptions, ...staticConfig };

    return this.app.use(this.instance.staticServer(settings.root, settings.options));
}

module.exports = staticServer;
