document.body.style.cursor = 'wait';
declare var require;
declare var startApp;
require([
     'CDN/lib/ModuleBU.js'
    ,'CDN/lib/Signal.js'
    ,'CDN/lib/leaflet.js'
    ,'CDN/lib/smoothie.js'
    ,'CDN/lib/gauge.min.js'

    ,'CDN/app/App.js'
 ]
, function() {
    console.log('loaded, now starting.')
    startApp()

})



