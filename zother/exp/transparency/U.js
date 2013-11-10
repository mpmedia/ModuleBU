var U = (function () {
    function U() {
    }
    U.toArray = function (obj) {
        var arr = new Array(obj.length);
        for (var i = 0; i < obj.length; i++) {
            arr[i] = obj[i];
        }
        return arr;
    };

    U.isString = function (obj) {
        return toString.call(obj) == '[object String]';
    };

    U.isNumber = function (obj) {
        return toString.call(obj) == '[object Number]';
    };

    U.isDate = function (obj) {
        return toString.call(obj) === '[object Date]';
    };

    U.isElement = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };

    U.isPlainValue = function (obj) {
        var type;
        type = typeof obj;
        return (type !== 'object' && type !== 'function') || U.isDate(obj);
    };

    U.isBoolean = function (obj) {
        return obj === true || obj === false;
    };
    U.isArray = Array.isArray || function (obj) {
        return toString.call(obj) === '[object Array]';
    };
    return U;
})();
//# sourceMappingURL=U.js.map
