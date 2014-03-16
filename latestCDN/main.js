document.body.style.cursor = 'wait';

require([
    'CDN/lib/ModuleBU.js',
    'CDN/lib/Signal.js',
    'CDN/lib/leaflet.js',
    'CDN/lib/smoothie.js',
    'CDN/lib/gauge.min.js',
    'CDN/app/App.js'
], function () {
    console.log('loaded, now starting.');
    startApp();
});
//# sourceMappingURL=main.js.map
