declare var ModuleMA;
declare var AppBU;
declare var Signal;

class App {
    hashSignal:any;

    constructor () {
        ModuleMA.moduleDir = 'pCDN/modules/'
        console.log('0.2')

        this.hashSignal = new Signal()//will signal to view managers.

        //create view managers
        new Service(this)

        this._setupNavDispatching()
        ModuleMA.showSpinner(false)

        AppBU.initPosSignal().add(this.onResize.bind(this)) // look bu, no classes, just util functions
        this.onResize()
    }//()

    private onResize() {
        var rect=ModuleMA.header.getBoundingClientRect()
        ModuleMA.kontainer.style.marginTop =rect.bottom+'px'
    }

    private onRoute() {
        var view = AppBU.getRoute();
        if (null==view|| 'undefined' == view || ''==view || ' ' ==view)
            view ='#service' // set default
        view = view.slice(1)
        console.log(view)
        this.hashSignal.dispatch(view)
        ModuleMA.domRem(ModuleMA.kontainer,0)
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

        this.onRoute()//triger first
    }



}

