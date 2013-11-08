var Service = (function () {
    function Service(any_) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this);
        AppBU.initMouseSignal().add(this.onMouse, this);
    }
    Service.prototype.transition = function () {
        Module.domAdd('Service.html', Module.kontainer);
    };

    Service.prototype.onView = function (view) {
        if ('service' == view)
            this.transition();
    };

    Service.prototype.onMouse = function () {
        console.log(Module.cv);
        console.log(Module.mouse);
    };
    return Service;
})();

var Vid = (function () {
    function Vid(any_) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this);
    }
    Vid.prototype.transition = function () {
        Module.domAdd('vid.html', Module.kontainer, this.onLoaded);
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
//# sourceMappingURL=Mgr.js.map
