var Service = (function () {
    function Service(any_) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this);
    }
    Service.prototype.transition = function () {
        ModuleMA.domAdd('Service.html', ModuleMA.kontainer);
    };

    Service.prototype.onView = function (view) {
        if ('service' == view)
            this.transition();
    };
    return Service;
})();

var Vid = (function () {
    function Vid(any_) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this);
    }
    Vid.prototype.transition = function () {
        ModuleMA.domAdd('vid.html', ModuleMA.kontainer, this.onLoaded);
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
