var App = (function () {
    function App() {
        ModuleMA.moduleDir = 'pCDN/modules/';
        console.log('0.2');

        this.hashSignal = new Signal();

        //create view managers
        new About(this);
        new Tut(this);
        new Vid(this);
        new Documentation(this);

        this._setupNavDispatching();
        ModuleMA.showSpinner(false);
    }
    App.prototype.onRoute = function () {
        var view = AppBU.getRoute();
        if (null == view || 'undefined' == view || '' == view || ' ' == view)
            view = '#about';
        view = view.slice(1);
        console.log(view);
        this.hashSignal.dispatch(view);
        ModuleMA.domRem(kontainer, 0);
    };

    App.prototype._setupNavDispatching = function () {
        AppBU.route(this.onRoute.bind(this));

        // off site
        AppBU.onClick('blogBut', function () {
            AppBU.goLocation('http://primusapi.wordpress.com');
        });
        AppBU.onClick('login', function () {
            AppBU.goLocation('http://ca_1.primusAPI.com/account');
        });

        this.onRoute();
    };
    return App;
})();
//# sourceMappingURL=App.js.map
