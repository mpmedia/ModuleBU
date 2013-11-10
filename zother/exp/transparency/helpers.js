var ElementFactory = (function () {
    function ElementFactory() {
        this.getElements = function (el) {
            var elements;

            elements = [];
            ElementFactory._getElements(el, elements);
            return elements;
        };
    }
    ElementFactory._getElements = function (template, elements) {
        var child, _results;

        child = template.firstChild;
        _results = [];
        while (child) {
            if (child.nodeType === ElementFactory.ELEMENT_NODE) {
                elements.push(new ElementFactory.createElement(child));
                ElementFactory._getElements(child, elements);
            }
            _results.push(child = child.nextSibling);
        }
        return _results;
    };

    ElementFactory.html5Clone = function () {
        return document.createElement('nav').cloneNode(true).outerHTML !== '<:nav></:nav>';
    };

    ElementFactory.prototype.cloneNodeS = function (node) {
        ElementFactory.html5Clone();
        return node.cloneNode(true);

        //} : function(node) {
        var cloned, element, _i, _len, _ref;

        cloned = Transparency.clone(node);
        if (cloned.nodeType === ElementFactory.ELEMENT_NODE) {
            cloned.removeAttribute(expando);
            _ref = cloned.getElementsByTagName('*');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                element = _ref[_i];
                element.removeAttribute(expando);
            }
        }
        return cloned;
    };

    ElementFactory.data = function (element) {
        return element[expando] || (element[expando] = {});
    };
    ElementFactory.ELEMENT_NODE = 1;
    return ElementFactory;
})();
//# sourceMappingURL=helpers.js.map
