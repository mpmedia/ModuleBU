var AttributeFactory = (function () {
    function AttributeFactory(el) {
        this.el = el;
        this.attributes = {};
        this.childNodes = _.toArray(this.el.childNodes);
        this.nodeName = this.el.nodeName.toLowerCase();
        this.classNames = this.el.className.split(' ');
        this.originalAttributes = {};
    }
    AttributeFactory.prototype.createElement = function (el) {
        var El, name;

        if ('input' === (name = el.nodeName.toLowerCase())) {
            El = ElementFactory.Elements[name][el.type.toLowerCase()] || Input;
        } else {
            El = ElementFactory.Elements[name] || Element;
        }
        return new El(el);
    };

    AttributeFactory.prototype.empty = function () {
        var child;

        while (child = this.el.firstChild) {
            this.el.removeChild(child);
        }
        return this;
    };

    AttributeFactory.prototype.reset = function () {
        var attribute, name, _ref, _results;

        _ref = this.attributes;
        _results = [];
        for (name in _ref) {
            attribute = _ref[name];
            _results.push(attribute.set(attribute.templateValue));
        }
        return _results;
    };

    AttributeFactory.prototype.render = function (value) {
        return this.attr('text', value);
    };

    AttributeFactory.prototype.attr = function (name, value) {
        var attribute, _base;

        attribute = (_base = this.attributes)[name] || (_base[name] = AttributeFactory.createAttribute(this.el, name, value));
        if (value != null) {
            attribute.set(value);
        }
        return attribute;
    };

    AttributeFactory.prototype.renderDirectives = function (model, index, attributes) {
        var directive, name, value, _results;

        _results = [];
        for (name in attributes) {
            if (!__hasProp.call(attributes, name))
                continue;
            directive = attributes[name];
            if (!(typeof directive === 'function')) {
                continue;
            }
            value = directive.call(model, {
                element: this.el,
                index: index,
                value: this.attr(name).templateValue
            });
            if (value != null) {
                _results.push(this.attr(name, value));
            } else {
                _results.push(void 0);
            }
        }
        return _results;
    };
    return AttributeFactory;
})();

classSelect = (function (_super) {
    __extends(Select, _super);

    ElementFactory.Elements['select'] = Select;

    function Select(el) {
        Select.__super__.constructor.call(this, el);
        this.elements = helpers.getElements(el);
    }

    Select.prototype.render = function (value) {
        var option, _i, _len, _ref, _results;

        value = value.toString();
        _ref = this.elements;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            option = _ref[_i];
            if (option.nodeName === 'option') {
                _results.push(option.attr('selected', option.el.value === value));
            }
        }
        return _results;
    };

    return Select;
})(Element);

VoidElement = (function (_super) {
    var VOID_ELEMENTS, nodeName, _i, _len;

    __extends(VoidElement, _super);

    function VoidElement() {
        _ref = VoidElement.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    VOID_ELEMENTS = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

    for (_i = 0, _len = VOID_ELEMENTS.length; _i < _len; _i++) {
        nodeName = VOID_ELEMENTS[_i];
        ElementFactory.Elements[nodeName] = VoidElement;
    }

    VoidElement.prototype.attr = function (name, value) {
        if (name !== 'text' && name !== 'html') {
            return VoidElement.__super__.attr.call(this, name, value);
        }
    };

    return VoidElement;
})(Element);

Input = (function (_super) {
    __extends(Input, _super);

    function Input() {
        _ref1 = Input.__super__.constructor.apply(this, arguments);
        return _ref1;
    }

    Input.prototype.render = function (value) {
        return this.attr('value', value);
    };

    return Input;
})(VoidElement);

TextArea = (function (_super) {
    __extends(TextArea, _super);

    function TextArea() {
        _ref2 = TextArea.__super__.constructor.apply(this, arguments);
        return _ref2;
    }

    ElementFactory.Elements['textarea'] = TextArea;

    return TextArea;
})(Input);

Checkbox = (function (_super) {
    __extends(Checkbox, _super);

    function Checkbox() {
        _ref3 = Checkbox.__super__.constructor.apply(this, arguments);
        return _ref3;
    }

    ElementFactory.Elements['input']['checkbox'] = Checkbox;

    Checkbox.prototype.render = function (value) {
        return this.attr('checked', Boolean(value));
    };

    return Checkbox;
})(Input);

Radio = (function (_super) {
    __extends(Radio, _super);

    function Radio() {
        _ref4 = Radio.__super__.constructor.apply(this, arguments);
        return _ref4;
    }

    ElementFactory.Elements['input']['radio'] = Radio;

    return Radio;
})(Checkbox);
//# sourceMappingURL=elementFactory.js.map
