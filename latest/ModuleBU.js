/**
(c) http://github.com/puppetMaster3/ModuleBU
requires attribution for derivatives or inspired by, as per Attribution Assurance License @ http://github.com/puppetMaster3/ModuleBU

'bu' =term of affection as applied to a significant other.
It may need Signals observer pattern if you use the bus.

App Event Bus to DOM Module  *util*
*/
console.log('ModuleBU v1.1105b utils');

/**
* Module presenter(View Manager) state MAchine:Module
*/
var Module = (function () {
    function Module() {
    }
    Module.domAdd = /**
    * Get and Append a child
    * @param ht view minus moduleDir root
    * @param apDom where to append
    * @param cb_ return random #, not used. But could be for GUID
    */
    function (ht, apDom, cb_) {
        Module.showSpinner(true);
        var req = new XMLHttpRequest();
        req.onload = function () {
            console.log('loaded ' + ht);
            apDom.innerHTML += req.response;
            Module.showSpinner(false);
            if (cb_)
                cb_(Math.floor(Math.random() * 9999999));
        };
        req.onerror = function (e) {
            console.log(e);
        };
        req.open('get', Module.moduleDir + ht);
        req.send();
    };

    Module.domRem = /**
    * Remove children till i remains, GC
    * @param rDom
    * @param i
    */
    function (rDom, i) {
        var elList = rDom.children;
        console.log(elList.length);
        while (elList.length > i) {
            rDom.removeChild(rDom.lastChild);
            elList = rDom.children;
        }
    };

    Module.getCVInfo = /**
    * Returns some containers viewport info
    * @returns {Object}
    */
    function () {
        //cv.pixR = window.devicePixelRatio
        Module.cv.H = window.innerHeight;

        //cv.cH = document.documentElement.clientHeight
        Module.cv.W = window.innerWidth;

        //cv.cW = document.documentElement.clientWidth
        Module.cv.sT = document.body.scrollTop;
        Module.cv.bot = Module.cv.sT + Module.cv.H;

        Module.cv.pY = window.pageYOffset;
        return Module.cv;
    };

    Module.isInView = /**
    * Call to see if element's rectangle is visible
    * @param elRectObj
    * @param cv
    * @returns {boolean}
    */
    function (elRectObj, cv) {
        var elTop = cv.sT + elRectObj.top;
        return (elTop < cv.bot);
    };

    Module.collides = function (a, b) {
        return !(((a.y + a.height) < (b.y)) || (a.y > (b.y + b.height)) || ((a.x + a.width) < b.x) || (a.x > (b.x + b.width)));
    };

    Module.showSpinner = function (status) {
        if (status)
            document.body.style.cursor = 'wait';
else
            document.body.style.cursor = 'default';
    };
    Module.kontainer = document.getElementById('kontainer');
    Module.header = document.getElementById('header');

    Module.cv = new Object();

    Module.mouse = new Object();
    return Module;
})();

/**
* BUs:AppBU
*/
var AppBU = (function () {
    function AppBU() {
    }
    AppBU.route = function (cb) {
        AppBU._cb = cb;
        window.onhashchange = function (e) {
            AppBU._cb(AppBU.getRoute());
            return true;
        }.bind(this);
    };

    AppBU.goLocation = function (url) {
        window.location = url;
    };

    AppBU.getRoute = /**
    * You need to know
    * @returns {string}
    */
    function () {
        return (window.location.hash);
    };

    AppBU.setHash = function (v) {
        window.location.hash = v;
    };

    AppBU.initPosSignal = /**
    * Start dispatching pos scroll changes
    * @private
    */
    function () {
        AppBU.posSignal = new Signal();
        window.onscroll = AppBU.debounce(function () {
            AppBU.posSignal.dispatch(Module.getCVInfo());
        }, 50);
        window.onresize = AppBU.debounce(function () {
            AppBU.posSignal.dispatch(Module.getCVInfo());
        }, 50);
        return AppBU.posSignal;
    };

    AppBU.debounce = function (func, threshold) {
        var timeout;
        return function debounced() {
            var obj = this, args = arguments;

            function delayed() {
                func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            timeout = setTimeout(delayed, threshold);
        };
    };

    AppBU.initMouseSignal = function () {
        Module.getCVInfo();
        AppBU.mouseSignal = new Signal();
        document.onmousemove = AppBU.debounce(function (evt) {
            Module.mouse.x = evt.clientX;
            Module.mouse.y = evt.clientY;

            AppBU.mouseSignal.dispatch(Module.mouse);
        }, 50);
        return AppBU.mouseSignal;
    };

    AppBU.onClick = /**
    * @param id
    * @param func
    */
    function (id, func) {
        try  {
            var but = document.getElementById(id);
            but.addEventListener('click', function (evt) {
                evt.preventDefault();
                func(id);
            });
        } catch (e) {
            console.log(id + ' not found');
        }
    };
    return AppBU;
})();

var OtherUT = (function () {
    function OtherUT() {
    }
    OtherUT.isEmailValid = //helper functions
    function (email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    return OtherUT;
})();
//# sourceMappingURL=ModuleBU.js.map
