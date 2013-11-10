
class Transparency {

public render (context, models, directives, options) {
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
}

public static matcher (element, key) {
  return element.el.id === key || __indexOf.call(element.classNames, key) >= 0 || element.el.name === key || element.el.getAttribute('data-bind') === key;
}

public static cloneS (node) {
  return $(node).clone()[0];
}

}