
class U {

public static toArray(obj) {
      var arr = new Array(obj.length);
      for (var i = 0; i < obj.length; i++) {
        arr[i] = obj[i];
      }
      return arr;
}

public static isString(obj) {
        return toString.call(obj) == '[object String]';
}

public static isNumber(obj) {
        return toString.call(obj) == '[object Number]';
}

public static isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
}

public static isDate(obj) {
  return toString.call(obj) === '[object Date]';
}

public static isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}

public static isPlainValue(obj) {
  var type;
  type = typeof obj;
  return (type !== 'object' && type !== 'function') || U.isDate(obj);
}

public static isBoolean(obj) {
  return obj === true || obj === false;
}

}//class
