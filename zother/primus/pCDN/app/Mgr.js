var Tut = (function () {
    function Tut(any_) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this);
    }
    Tut.prototype.transition = function () {
        ModuleMA.domAdd('tutorials.html', kontainer, this.onLoaded.bind(this));
    };
    Tut.prototype.onLoaded = function (nid) {
        TweenLite.from('#' + nid, 2, { css: { rotationY: 90, transformOrigin: "100% " } });
    };

    Tut.prototype.onView = function (view) {
        if ('tut' == view)
            this.transition();
    };
    return Tut;
})();

var Vid = (function () {
    function Vid(any_) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this);
    }
    Vid.prototype.transition = function () {
        ModuleMA.domAdd('vid.html', kontainer, this.onLoaded);
    };
    Vid.prototype.onLoaded = function () {
        $('#ytplayer').width($(document).width());
        $('#ytplayer').height($(document).height() - 90);
        TweenLite.to($('#ytplayer'), .25, { opacity: 1, delay: .3 });
    };
    Vid.prototype.onView = function (view) {
        if ('vid' == view)
            this.transition();
    };
    return Vid;
})();

var About = (function () {
    function About(any_) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this);
    }
    About.prototype.transition = function () {
        ModuleMA.domAdd('About.html', kontainer);
    };
    About.prototype.onLoaded = function () {
    };
    About.prototype.onView = function (view) {
        if ('about' == view)
            this.transition();
    };
    return About;
})();

var Documentation = (function () {
    function Documentation(any_) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this);
    }
    Documentation.prototype.transition = function () {
        ModuleMA.domAdd('documentation.html', kontainer);
    };
    Documentation.prototype.onView = function (view) {
        if ('docum' == view)
            this.transition();
    };
    return Documentation;
})();
//# sourceMappingURL=Mgr.js.map
