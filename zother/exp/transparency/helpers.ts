class ElementFactory {

static ELEMENT_NODE = 1;

public getElements = function(el) {
  var elements;

  elements = [];
    ElementFactory._getElements(el, elements);
  return elements;
}

public static  _getElements (template, elements) {
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
}

public static html5Clone() {
  return document.createElement('nav').cloneNode(true).outerHTML !== '<:nav></:nav>';
}

public cloneNodeS (node) {// (typeof document === "undefined" || document === null) ||
    ElementFactory.html5Clone()// ? function(node) {
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
}



public static data(element) {
  return element[expando] || (element[expando] = {});
}


}