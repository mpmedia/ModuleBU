/**
 (c) http://github.com/puppetMaster3/ModuleBU
 requires attribution for derivatives or inspired by, as per Attribution Assurance License @ http://github.com/puppetMaster3/ModuleBU

 It may need Signals observer pattern if you use the bus.

 App Event Bus to DOM Module  *util*
*/
console.log('ModuleBU v1.1105a utils')

declare var Signal:any;//observer class

/**
 * Module presenter(View Manager) state MAchine:ModuleMA
 */
class ModuleMA {
    static kontainer = document.getElementById('kontainer')
    static header    = document.getElementById('header')

    /**
     * Pages directory
     */
     static moduleDir:string;

    /**
     * Get and Append a child
     * @param ht view minus moduleDir root
     * @param apDom where to append
     * @param cb_ return random #, not used. But could be for GUID
     */
    static domAdd(ht:string, apDom, cb_?):void {
        ModuleMA.showSpinner(true)
        var req = new XMLHttpRequest()
        req.onload = function() {
            console.log('loaded ' + ht)
            apDom.innerHTML += req.response
            ModuleMA.showSpinner(false)
            if(cb_)
                cb_(Math.floor(Math.random() * 9999999)) //GUID 1 in 10mm
        }
        req.onerror = function(e) {
            console.log(e)
        }
        req.open('get', ModuleMA.moduleDir + ht)
        req.send()
    }


    /**
     * Remove children till i remains, GC
     * @param rDom
     * @param i
     */
    static domRem(rDom, i:number) {
        var elList:HTMLCollection = rDom.children;
        console.log(elList.length)
        while(elList.length>i) {//remove children till we have
                rDom.removeChild(rDom.lastChild)
                elList= rDom.children;
        }
    }

    /**
     * Curent view
     */
    static cv:any = new Object()
    
    /**
     * Curent mouse
     */
    static mouse:any = new Object()

    /**
      * Returns some containers viewport info
      * @returns {Object}
      */
     static getCVInfo() {
         //cv.pixR = window.devicePixelRatio

        ModuleMA.cv.H = window.innerHeight
         //cv.cH = document.documentElement.clientHeight
        ModuleMA.cv.W = window.innerWidth
         //cv.cW = document.documentElement.clientWidth

        ModuleMA.cv.sT = document.body.scrollTop
        ModuleMA.cv.bot = ModuleMA.cv.sT +  ModuleMA.cv.H // bottom

        ModuleMA.cv.pY = window.pageYOffset
         return ModuleMA.cv
     }

    /**
     * Call to see if element's rectangle is visible
     * @param elRectObj
     * @param cv
     * @returns {boolean}
     */
    static isInView(elRectObj, cv):boolean {
        var elTop = cv.sT+elRectObj.top
        return (elTop<cv.bot)
    }

    static collides (a, b):boolean{
        return !(
            ((a.y + a.height) < (b.y)) ||
                (a.y > (b.y + b.height)) ||
                ((a.x + a.width) < b.x) ||
                (a.x > (b.x + b.width))
            )
    }

    static showSpinner(status){
        if (status)
            document.body.style.cursor = 'wait';
        else
            document.body.style.cursor = 'default';
    }




}//class


/**
 * BUs:AppBU
 */
class AppBU { // term of affection, usually applied to a significant other
    static _cb:any;

    static route(cb) {
        AppBU._cb=cb
        window.onhashchange = function(e) {
            AppBU._cb(AppBU.getRoute())
            return true
        }.bind(this)
    }

    static goLocation (url){
        window.location=url
    }

    /**
     * You need to know
     * @returns {string}
     */
    static getRoute():string{
        return( window.location.hash )
    }

    static setHash(v:string) {
        window.location.hash = v
    }

    //// scroll section
    static posSignal:any;
    /**
     * Start dispatching pos scroll changes
     * @private
     */
    static initPosSignal() {
        AppBU.posSignal = new Signal();
        window.onscroll= AppBU.debounce(function() {
                AppBU.posSignal.dispatch(ModuleMA.getCVInfo())
            },50)
        window.onresize = AppBU.debounce(function() {
                AppBU.posSignal.dispatch(ModuleMA.getCVInfo())
            },50)
        return AppBU.posSignal
    }//()

    static debounce(func, threshold) {
        var timeout
        return function debounced () {
            var obj = this, args = arguments;

            function delayed () {
                func.apply(obj, args)
                timeout = null
            }

            if (timeout)
                clearTimeout(timeout)
            timeout = setTimeout(delayed, threshold )
        }
    }

    ////// mouse WIP
    static mouseSignal:any;
    static initMouseSignal() {
        AppBU.mouseSignal=new Signal()
        document.onmousemove = AppBU.debounce(function(evt) {
                ModuleMA.mouse.x =  evt.clientX
                ModuleMA.mouse.y =  evt.clientY

                AppBU.mouseSignal.dispatch(ModuleMA.mouse)
            },50)
        return AppBU.mouseSignal
    }

    /**
     * @param id
     * @param func
     */
    static onClick(id:string,func:Function) {
        try{
            var but = document.getElementById(id)
            but.addEventListener('click',function(evt) {
                evt.preventDefault()
                func(id)
            })
        } catch (e) {
            console.log(id + ' not found')
        }
    }

}


class OtherUT{

    //helper functions
    static isEmailValid(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

}



