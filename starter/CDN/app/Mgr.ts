declare var kontainer;
declare var TweenLite;
declare var Module;
declare var AppBU;
declare var Transparency;// biding

function startApp() {
    console.log('version 0.001a')
    Module.moduleDir = 'CDN/modules/'

    //set up route/hash/ctrl
    AppBU.route(onRoute)
    AppBU.initPosSignal().add(onScroll) // look bu, no classes, just util functions
    AppBU.initMouseSignal().add(onMouse)
    // just for now
    Module.domAdd('AboutPg.html',kontainer)
}

function onScroll(cv) {
    console.log(cv)
    var el = document.getElementById('someItem')
    var vis:boolean=Module.isInView(el.getBoundingClientRect(), cv)
    console.log(vis)
}

function onRoute(hash) {
    console.log(hash)
    Module.domRem(kontainer,0) //#6
    Module.domAdd('HomePg.html',kontainer, onLoadedBindTemplate)
}

function onLoadedBindTemplate() {
    var rows = [ //fake data that you should get via HTML5 CORS
         { name: 'Jonny', city:'Stockholm' }
        ,{ name: 'Jonas', city:'Berlin' }
    ]

    //transparency.js
    Transparency.render(document.getElementById('binding'), rows);

}

function onMouse(mx,my) {
    console.log(mx,my)
}

/* side bar
var navFlag:boolean = false
function toggleSideNav () {
    console.log('slider')
    if(!this.navFlag) {
        TweenLite.to('#slider',.2,{x:405})
        TweenLite.to('#kontainer',.2,{x:405})
    } else {
        closeNav()
    }
    this.navFlag = !this.navFlag
}//()
function closeNav() {
    TweenLite.to('#slider',.2,{x:0})
    TweenLite.to('#kontainer',.2,{x:0})
}
*/
