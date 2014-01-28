/**
(c) http://github.com/puppetMaster3/blueGrass
requires attribution for derivatives or inspired by, as per Attribution Assurance License @ http://github.com/puppetMaster3/blueGrass

App Event Bus to SM Module Presenter *util*
*/
console.log('blueGrass v1.1101b utils');

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
        cv.iH = window.innerHeight;
        cv.cH = document.documentElement.clientHeight;
        cv.iW = window.innerWidth;
        cv.cW = document.documentElement.clientWidth;

        cv.sT = document.body.scrollTop;
        return cv;
    };

    ModuleMA.isElVisible = /**
    * Call to see if element's rectangle is visible
    * @param elRectObj
    * @param cv
    * @returns {boolean}
    */
    function (elRectObj, cv) {
        return ((elRectObj.bottom <= (cv.iH || cv.cH) || elRectObj.right <= (cv.iW || cv.cW)));
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
            AppBU._cb();
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

    AppBU._initPosSignal = /**
    * Start dispatching pos scroll changes
    * @private
    */
    function () {
        window.onscroll = function (evt) {
            AppBU._posChanged = true;
        };
        window.onresize = function (event) {
            AppBU._posChanged = true;
        };
        AppBU._posLoop();
    };
    AppBU._posLoop = function () {
        if (AppBU._posChanged) {
            AppBU.posSignal.dispatch(ModuleMA.getCVInfo());
            AppBU._posChanged = false;
        }
        setTimeout(AppBU._posLoop, 100);
    };

    AppBU.onClick = /**
    * @param id
    * @param func
    */
    function (id, func) {
        var but = document.getElementById(id);
        but.addEventListener('click', function (evt) {
            evt.preventDefault();
            func(id);
        });
    };

    AppBU.getGuerryString = function (key) {
        key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
        var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
        return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    };
    AppBU._posChanged = false;
    AppBU.posSignal = new Signal();
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
//# sourceMappingURL=blueGrass.js.map
