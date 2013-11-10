declare var Mod;
declare var AppBU;
declare var Signal;
declare var Parallax;

class App {
    hashSignal:any;

    constructor () {
        Mod.moduleDir = 'pCDN/modules/'
        console.log('0.2')

        this.hashSignal = new Signal()//will signal to view managers.

        //create view managers
        new Service(this)

        this._setupNavDispatching()
        Mod.showSpinner(false)

        AppBU.initPosSignal().add(this.onResize.bind(this)) // look bu, no classes, just util functions
        this.onResize()

        //parallax
        var scene = document.getElementById('outerKontainer')
        var parallax = new Parallax(scene)
    }//()

    private onResize() {
        var rect=Mod.header.getBoundingClientRect()
        Mod.kontainer.style.marginTop =rect.bottom+'px'
    }

    private onRoute() {
        var view = AppBU.getRoute();
        if (null==view|| 'undefined' == view || ''==view || ' ' ==view)
            view ='#service' // set default
        view = view.slice(1)
        console.log(view)
        this.hashSignal.dispatch(view)
        Mod.domRem(Mod.kontainer,0)
    }

    private _setupNavDispatching() {
        AppBU.route(this.onRoute.bind(this))

        // off site
        AppBU.onClick('blog', function() {
            AppBU.goLocation('http://primusapi.wordpress.com')
        })
        AppBU.onClick('try', function() {
            AppBU.goLocation('http://ca_1.primusAPI.com/account')
        })

        this.onRoute()//trigger first
    }



}

