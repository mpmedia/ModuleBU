//document.body.style.cursor = 'wait'
require(['//scdn-primus.netdna-ssl.com/latest/jquery.js'
        ,'//scdn-primus.netdna-ssl.com/latest/TweenLite.min.js'
        ,'//scdn-primus.netdna-ssl.com/latest/ModBU.js'
        ,'//scdn-primus.netdna-ssl.com/latest/CSSPlugin.min.js'
        ], function() {
    console.log('loaded')
})

function foo() {
    var pg = getHash()
    console.log(pg)
}
window.addEventListener('hashchange', foo)

declare var TweenLite;//tsc
// nav code ////////////////////////////////////
var hamBut= document.getElementById('hamburger')
hamBut.addEventListener('click',function() {
    toggleSideNav()
})
var navFlag:boolean
function toggleSideNav () {
    console.log('slider' )
    if(!navFlag) {
        TweenLite.to('#slider', .2,{x:408})
        TweenLite.to('#kontainer',.2,{x:400})
    } else {
        TweenLite.to('#slider', .2,{x:0})
        TweenLite.to('#kontainer',.2,{x:0})
    }
    navFlag = !navFlag
}//()

var aboutBut= document.getElementById('about')
aboutBut.addEventListener('click', loadAbout)
function loadAbout(e) {
   // console.log(e)
    e.preventDefault()
    setHash("about")
    //console.log('about')
}

var aboutBut= document.getElementById('more')
aboutBut.addEventListener('click', loadMore)
function loadMore(e) {
    // console.log(e)
    e.preventDefault()
    setHash("more")
    //console.log('about')
}
console.log('v2')