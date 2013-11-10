var Transparency = (function () {
    function Transparency() {
    }
    Transparency.prototype.render = function (context, models, directives, options) {
        var _base;

        if (models == null) {
            models = [];
        }
        if (directives == null) {
            directives = {};
        }
        if (options == null) {
            options = {};
        }

        if (!context) {
            return;
        }

        if (!U.isArray(models)) {
            models = [models];
        }
        context = (_base = helpers.data(context)).context || (_base.context = new Context(context, Transparency));
        return context.render(models, directives, options).el;
    };

    Transparency.matcher = function (element, key) {
        return element.el.id === key || __indexOf.call(element.classNames, key) >= 0 || element.el.name === key || element.el.getAttribute('data-bind') === key;
    };

    Transparency.cloneS = function (node) {
        return $(node).clone()[0];
    };
    return Transparency;
})();
//# sourceMappingURL=transparency.js.map
