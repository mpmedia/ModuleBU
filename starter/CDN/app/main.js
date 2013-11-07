document.body.style.cursor = 'wait';

require([
    'http://localhost:63342/blueGrass/latest/ModuleBU.js',
    '//scdn-primus.netdna-ssl.com/latest/TweenLite.min.js',
    '//scdn-primus.netdna-ssl.com/latest/CSSPlugin.min.js',
    '//scdn-primus.netdna-ssl.com/latest/Signal.js',
    '//scdn-primus.netdna-ssl.com/cloudAPI.js',
    '//scdn-primus.netdna-ssl.com/latest/more/transparency.min.js',

    'CDN/app/Mgr.js'
], function () {
    console.log('require loaded, start up:');
    startApp();
});

//global, I know
var kontainer = document.getElementById('kontainer');
