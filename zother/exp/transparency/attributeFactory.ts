class Attribute {

public createAttribute(element, name) {
    var Attr;

    Attr = AttributeFactory.Attributes[name] || Attribute;
    return new Attr(element, name);
}

   el;
   name;
   templateValue;
constructor (el, name) {
    this.el = el;
    this.name = name;
    this.templateValue = this.el.getAttribute(this.name) || '';
  }

public set(value) {
    this.el[this.name] = value;
    return this.el.setAttribute(this.name, value.toString());
  }

}

class Html {
    el;
    templateValue;
    children;

constructor Html(el) {
    this.el = el;
    this.templateValue = '';
    this.children = U.toArray(this.el.children);
  }

public set(html) {
    var child, _i, _len, _ref, _results;

    while (child = this.el.firstChild) {
      this.el.removeChild(child);
    }
    this.el.innerHTML = html + this.templateValue;
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(this.el.appendChild(child));
    }
    return _results;
  }

}



class Text  {
    el;
    name;
    templateValue;

    children;
    textNode;

    constructor (el, name) {
        var child;

        this.el = el;
        this.name = name;
        this.templateValue = ((function() {
            var _i, _len, _ref, _results;

            _ref = this.el.childNodes;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                child = _ref[_i];
                if (child.nodeType === helpers.TEXT_NODE) {
                    _results.push(child.nodeValue);
                }
            }
            return _results;
        }).call(this)).join('');
        this.children = _.toArray(this.el.children);
        if (!(this.textNode = this.el.firstChild)) {
            this.el.appendChild(this.textNode = this.el.ownerDocument.createTextNode(''));
        } else if (this.textNode.nodeType !== helpers.TEXT_NODE) {
            this.textNode = this.el.insertBefore(this.el.ownerDocument.createTextNode(''), this.textNode);
        }
    }

    public set (text) {
        var child, _i, _len, _ref, _results;

        while (child = this.el.firstChild) {
            this.el.removeChild(child);
        }
        this.textNode.nodeValue = text;
        this.el.appendChild(this.textNode);
        _ref = this.children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            _results.push(this.el.appendChild(child));
        }
        return _results;
    };

}


class BooleanAttribute{


    static BOOLEAN_ATTRIBUTES = ['hidden', 'async', 'defer', 'autofocus', 'formnovalidate', 'disabled', 'autofocus', 'formnovalidate', 'multiple', 'readonly', 'required', 'checked', 'scoped', 'reversed', 'selected', 'loop', 'muted', 'autoplay', 'controls', 'seamless', 'default', 'ismap', 'novalidate', 'open', 'typemustmatch', 'truespeed'];

   name;
   el;
   templateValue;


    constructor(el, name) {
        this.el = el;
        this.name = name;
        this.templateValue = this.el.getAttribute(this.name) || false;
    }

    public set (value) {
        this.el[this.name] = value;
        if (value) {
            return this.el.setAttribute(this.name, this.name);
        } else {
            return this.el.removeAttribute(this.name);
        }
    };


}