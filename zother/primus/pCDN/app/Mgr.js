var Service = (function () {
    function Service(any_) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this);
        AppBU.initMouseSignal().add(this.onMouse, this);
    }
    Service.prototype.transition = function () {
        Mod.domAdd('Service.html', Mod.kontainer, this.onLoaded.bind(this));
    };

    Service.prototype.onView = function (view) {
        if ('service' == view)
            this.transition();
    };

    Service.prototype.onLoaded = function () {
        console.log('loaded');
        this.back = document.getElementById('service');
        console.log(this.back);
    };

    Service.prototype.onMouse = function () {
        console.log(Mod.mouse.par);
        TweenLite.to(this.back, .5, { backgroundPosition: Mod.mouse.par * 5 + 'px' });
    };
    return Service;
})();

var Vid = (function () {
    function Vid(any_) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this);
    }
    Vid.prototype.transition = function () {
        Mod.domAdd('vid.html', Mod.kontainer, this.onLoaded);
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
