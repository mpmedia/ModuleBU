declare var Mod;
declare var TweenLite;
declare var App;
declare var AppBU;

class Service {
    private any:any;
    private back:any;
    constructor(any_:any) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this)
        AppBU.initMouseSignal().add(this.onMouse,this)
    }
    private transition():any {
        Mod.domAdd('Service.html',Mod.kontainer, this.onLoaded.bind(this))
    }

    private onView(view:string){
        if('service'==view)
            this.transition()
    }//()

    private onLoaded() {
        console.log('loaded')
        this.back = document.getElementById('service')
        console.log(this.back)
    }

    private onMouse() {
        console.log(Mod.mouse.par)
        TweenLite.to(this.back,.5, {backgroundPosition: Mod.mouse.par * 5 +'px'})
    }

}


class Vid  {
    private any:any;
    constructor(any_:any) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this)
    }
    private transition():any {
        Mod.domAdd('vid.html',Mod.kontainer,this.onLoaded)
    }
    private onLoaded() {
        $('#ytplayer').width($(document).width())
        $('#ytplayer').height($(document).height()-90)
        TweenLite.to($('#ytplayer'),.25, {opacity:1, delay:.3})
    }
    private onView(view:string){
        if('vid'==view)
            this.transition()
    }//() 
}

