document.body.style.cursor = 'wait';
declare var require;
declare var startApp;
require([
     '//scdn-primus.netdna-ssl.com/latest/ModuleBU.js'  // Mod-BUs
    ,'//scdn-primus.netdna-ssl.com/latest/TweenLite.min.js' // Pro animation
    ,'//scdn-primus.netdna-ssl.com/latest/CSSPlugin.min.js' // CSS animation plug
    ,'//scdn-primus.netdna-ssl.com/latest/Signal.js'        // Observer
    ,'//scdn-primus.netdna-ssl.com/cloudAPI.js'             // API

    ,'//scdn-primus.netdna-ssl.com/latest/more/transparency.min.js' // template binding
    ,'CDN/app/Mgr.js'
  ]
  , function() {
        console.log('require loaded, start up:')
        startApp()
})



