var App = (function () {
    function App() {
        Mod.moduleDir = 'pCDN/modules/';
        console.log('0.2');

        this.hashSignal = new Signal();

        //create view managers
        new Service(this);

        this._setupNavDispatching();
        Mod.showSpinner(false);

        AppBU.initPosSignal().add(this.onResize.bind(this));
        this.onResize();
    }
    App.prototype.onResize = function () {
        var rect = Mod.header.getBoundingClientRect();
        Mod.kontainer.style.marginTop = rect.bottom + 'px';
    };

    App.prototype.onRoute = function () {
        var view = AppBU.getRoute();
        if (null == view || 'undefined' == view || '' == view || ' ' == view)
            view = '#service';
        view = view.slice(1);
        console.log(view);
        this.hashSignal.dispatch(view);
        Mod.domRem(Mod.kontainer, 0);
    };

    App.prototype._setupNavDispatching = function () {
        AppBU.route(this.onRoute.bind(this));

        // off site
        AppBU.onClick('blog', function () {
            AppBU.goLocation('http://primusapi.wordpress.com');
        });
        AppBU.onClick('try', function () {
            AppBU.goLocation('http://ca_1.primusAPI.com/account');
        });

        this.onRoute();
    };
    return App;
})();
//# sourceMappingURL=App.js.map
