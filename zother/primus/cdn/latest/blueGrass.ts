/**
 (c) http://github.com/puppetMaster3/blueGrass
 requires attribution for derivatives or inspired by, as per Attribution Assurance License @ http://github.com/puppetMaster3/blueGrass

 App Event Bus to SM Module Presenter *util*
*/
console.log('blueGrass v1.1101b utils')

declare var Signal:any;//observer class

/**
 * Module presenter(View Manager) state MAchine:ModuleMA
 */
class ModuleMA {
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
      * Returns some containers viewport info
      * @returns {Object}
      */
     static getCVInfo() {
         var cv:any = new Object()
         //cv.pixR = window.devicePixelRatio

         cv.iH = window.innerHeight
         cv.cH = document.documentElement.clientHeight
         cv.iW = window.innerWidth
         cv.cW = document.documentElement.clientWidth

         cv.sT = document.body.scrollTop
         return cv
     }

    /**
     * Call to see if element's rectangle is visible
     * @param elRectObj
     * @param cv
     * @returns {boolean}
     */
    static isElVisible(elRectObj, cv):boolean {
        return (
            (elRectObj.bottom <= (cv.iH || cv.cH ) ||
             elRectObj.right  <= (cv.iW || cv.cW ))
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
            AppBU._cb()
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

    static _posChanged:boolean=false;
    static posSignal:any = new Signal();
    /**
     * Start dispatching pos scroll changes
     * @private
     */
    static _initPosSignal() {
        window.onscroll= function(evt) {
            AppBU._posChanged = true //deBounce
        }
        window.onresize = function(event) {
            AppBU._posChanged = true //deBounce
        }
        AppBU._posLoop()//start the loop
    }//()
    static _posLoop() {
        if ( AppBU._posChanged ) {
            AppBU.posSignal.dispatch(ModuleMA.getCVInfo())
            AppBU._posChanged = false
        }//fi
        setTimeout(AppBU._posLoop,100)//FPS
    }

    /**
     * @param id
     * @param func
     */
    static onClick(id:string,func:Function) {
        var but = document.getElementById(id)
        but.addEventListener('click',function(evt) {
            evt.preventDefault()
            func(id)
        })
    }

    static getGuerryString(key) {
        key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
        var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
        return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    }
}


class OtherUT{

    //helper functions
    static isEmailValid(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


}



