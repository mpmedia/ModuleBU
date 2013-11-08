declare var ModuleMA;
declare var TweenLite;
declare var App;


class Service {
    private any:any;
    constructor(any_:any) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this)
    }
    private transition():any {
        ModuleMA.domAdd('Service.html',ModuleMA.kontainer)
    }

    private onView(view:string){
        if('service'==view)
            this.transition()
    }//()
}



class Vid  {
    private any:any;
    constructor(any_:any) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this)
    }
    private transition():any {
        ModuleMA.domAdd('vid.html',ModuleMA.kontainer,this.onLoaded)
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

