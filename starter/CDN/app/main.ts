document.body.style.cursor = 'wait';
declare var require;
declare var startApp;
require([
     '//scdn-primus.netdna-ssl.com/latestCDN/ModuleBU.js'  // Mod-BUs
    ,'//scdn-primus.netdna-ssl.com/latestCDN/GSAP.min.js' // Pro animation
    ,'//scdn-primus.netdna-ssl.com/latestCDN/more/parallax.js'
    ,'//scdn-primus.netdna-ssl.com/latestCDN/Signal.js'        // Observer
    ,'//scdn-primus.netdna-ssl.com/cloudAPI.js'             // API

    ,'//scdn-primus.netdna-ssl.com/latestCDN/more/transparency.min.js' // template binding
    ,'CDN/app/Mgr.js'
  ]
  , function() {
        console.log('require loaded, start up:')
        startApp()
})



