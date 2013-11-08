var App = (function () {
    function App() {
        ModuleMA.moduleDir = 'pCDN/modules/';
        console.log('0.2');

        this.hashSignal = new Signal();

        //create view managers
        new Service(this);

        this._setupNavDispatching();
        ModuleMA.showSpinner(false);

        AppBU.initPosSignal().add(this.onResize.bind(this));
        this.onResize();
    }
    App.prototype.onResize = function () {
        var rect = ModuleMA.header.getBoundingClientRect();
        ModuleMA.kontainer.style.marginTop = rect.bottom + 'px';
    };

    App.prototype.onRoute = function () {
        var view = AppBU.getRoute();
        if (null == view || 'undefined' == view || '' == view || ' ' == view)
            view = '#service';
        view = view.slice(1);
        console.log(view);
        this.hashSignal.dispatch(view);
        ModuleMA.domRem(ModuleMA.kontainer, 0);
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
