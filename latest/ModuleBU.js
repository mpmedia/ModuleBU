/**
(c) http://github.com/puppetMaster3/ModuleBU
requires attribution for derivatives or inspired by, as per Attribution Assurance License @ http://github.com/puppetMaster3/ModuleBU

It needs Signals if you use scroll only

App Event Bus to SM Module Presenter *util*
*/
console.log('ModuleBU v1.1102 utils');

/**
* Module presenter(View Manager) state MAchine:ModuleMA
*/
var ModuleMA = (function () {
    function ModuleMA() {
    }
    ModuleMA.domAdd = /**
    * Get and Append a child
    * @param ht view minus moduleDir root
    * @param apDom where to append
    * @param cb_ return random #, not used. But could be for GUID
    */
    function (ht, apDom, cb_) {
        ModuleMA.showSpinner(true);
        var req = new XMLHttpRequest();
        req.onload = function () {
            console.log('loaded ' + ht);
            apDom.innerHTML += req.response;
            ModuleMA.showSpinner(false);
            if (cb_)
                cb_(Math.floor(Math.random() * 9999999));
        };
        req.onerror = function (e) {
            console.log(e);
        };
        req.open('get', ModuleMA.moduleDir + ht);
        req.send();
    };

    ModuleMA.domRem = /**
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

    ModuleMA.getCVInfo = /**
    * Returns some containers viewport info
    * @returns {Object}
    */
    function () {
        var cv = new Object();

        //cv.pixR = window.devicePixelRatio
        cv.H = window.innerHeight;

        //cv.cH = document.documentElement.clientHeight
        cv.W = window.innerWidth;

        //cv.cW = document.documentElement.clientWidth
        cv.sT = document.body.scrollTop;
        cv.bot = cv.sT + cv.H;

        cv.pY = window.pageYOffset;
        return cv;
    };

    ModuleMA.isInView = /**
    * Call to see if element's rectangle is visible
    * @param elRectObj
    * @param cv
    * @returns {boolean}
    */
    function (elRectObj, cv) {
        var elTop = cv.sT + elRectObj.top;
        return (elTop < cv.bot);
    };

    ModuleMA.collides = function (a, b) {
        return !(((a.y + a.height) < (b.y)) || (a.y > (b.y + b.height)) || ((a.x + a.width) < b.x) || (a.x > (b.x + b.width)));
    };

    ModuleMA.showSpinner = function (status) {
        if (status)
            document.body.style.cursor = 'wait';
else
            document.body.style.cursor = 'default';
    };
    return ModuleMA;
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
            AppBU.posSignal.dispatch(ModuleMA.getCVInfo());
        }, 50);
        window.onresize = AppBU.debounce(function () {
            AppBU.posSignal.dispatch(ModuleMA.getCVInfo());
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
        AppBU.mouseSignal = new Signal();
        document.onmousemove = AppBU.debounce(function (evt) {
            var mX = evt.clientX;
            var mY = evt.clientY;
            AppBU.mouseSignal.dispatch(mX, mY);
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
            console.log(e);
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
