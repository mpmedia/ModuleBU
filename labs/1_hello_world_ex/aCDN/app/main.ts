
document.body.style.cursor = 'wait'

require([
    '//scdn-primus.netdna-ssl.com/cloudAPI.js'

    ,'//scdn-primus.netdna-ssl.com/latest/more/jquery.js'
    ,'//scdn-primus.netdna-ssl.com/latest/TweenLite.min.js'
    ,'//scdn-primus.netdna-ssl.com/latest/ModBU.js'
    ,'//scdn-primus.netdna-ssl.com/latest/CSSPlugin.min.js'

    ,'//scdn-primus.netdna-ssl.com/latest/more/transparency.min.js'

    ,'aCDN/app/AppTmpl.js'

], function() { // we loaded
    new App()
})


