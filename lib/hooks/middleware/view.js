/**
 * @param {object} app - Application Instance
 * @returns {Function} Function
 */
function init(app) {
    const { locals } = app;
    const { views, config, ...rest } = locals;
    return function v(view, obj) {
        try {
            if (!view) throw new Error('view is not provided.');
            const { [view]: template } = views;
            if (!template) throw new Error(`${template} does not exists in views. ${views}`);
            const { locals: resLocals } = this;
            const htmlString = template({
                ...obj,
                config,
                ...rest,
                ...resLocals
            });
            return this.send(htmlString);
        } catch (e) {
            throw e;
        }
    };
}

module.exports = init;
