class Context {

public static detach() {//chainable
    this.parent = this.el.parentNode;

    if (this.parent) {
      this.nextSibling = this.el.nextSibling;
      return this.parent.removeChild(this.el);
    }

    return
  }

public static attach () {//chainable
    if (this.parent) {
      if (this.nextSibling) {
        return this.parent.insertBefore(this.el, this.nextSibling);
      } else {
        return this.parent.appendChild(this.el);
      }
    }

    return
  }

el;
template;
instances;
instanceCache;

constructor(el, Transparency) {
    this.el = el;
    this.Transparency = Transparency;
    this.template = cloneNode(this.el);
    this.instances = [new Instance(this.el, this.Transparency)];
    this.instanceCache = [];
  }

public render(models, directives, options) {// before(detach) (after(attach) (chainable(function
    var children, index, instance, model, _i, _len, _results;

    while (models.length < this.instances.length) {
      this.instanceCache.push(this.instances.pop().remove());
    }
    while (models.length > this.instances.length) {
      instance = this.instanceCache.pop() || new Instance(cloneNode(this.template), this.Transparency);
      this.instances.push(instance.appendTo(this.el));
    }
    _results = [];
    for (index = _i = 0, _len = models.length; _i < _len; index = ++_i) {
      model = models[index];
      instance = this.instances[index];
      children = [];
      _results.push(instance.prepare(model, children).renderValues(model, children).renderDirectives(model, index, directives).renderChildren(model, children, directives, options));
    }
    return _results;
  }

}//class