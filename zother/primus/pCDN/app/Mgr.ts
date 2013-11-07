declare var ModuleMA;
declare var TweenLite;
declare var App;
declare var kontainer;


class Service {
    private any:any;
    constructor(any_:any) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this)
    }
    private transition():any {
        ModuleMA.domAdd('Service.html',kontainer)
    }

    private onView(view:string){
        if('service'==view)
            this.transition()
    }//()
}


class Tut {
    private any:any;
    constructor(any_:any) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this)
    }
    private transition():any {
        ModuleMA.domAdd('tutorials.html',kontainer,this.onLoaded.bind(this))
    }
    private onLoaded(nid) {
        TweenLite.from('#'+nid, 2
            ,{css:{rotationY:90, transformOrigin:"100% "}  })
    }

    private onView(view:string){
        if('tut'==view)
            this.transition()
    }
}

class Vid  {
    private any:any;
    constructor(any_:any) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this)
    }
    private transition():any {
        ModuleMA.domAdd('vid.html',kontainer,this.onLoaded)
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

class About {
    private any:any;
    constructor(any_:any) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this)
    }
    private transition():any {
        ModuleMA.domAdd('About.html',kontainer)
    }

    private onView(view:string){
        if('about'==view)
            this.transition()
    }//()
}


class Documentation {
    private any:any;
    constructor(any_:any) {
        this.any = any_;
        any_.hashSignal.add(this.onView, this)
    }
    private transition():any {
        ModuleMA.domAdd('documentation.html',kontainer)
    }
    private onView(view:string){
        if('docum'==view)
            this.transition()
    }
}