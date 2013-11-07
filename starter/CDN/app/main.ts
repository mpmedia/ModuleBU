document.body.style.cursor = 'wait';
declare var require;
declare var startApp;
require([
     'http://localhost:63342/blueGrass/latest/ModuleBU.js'  // Module-BUs
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

//global, I know
var kontainer = document.getElementById('kontainer')


