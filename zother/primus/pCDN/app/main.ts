document.body.style.cursor = 'wait';
declare var require;//tsc
declare var App;

// loader code ///////////////////////////////
require([
     '//localhost:63342/ModuleBU/latest/ModuleBU.js' //http://localhost:63342/ModuleBU/
    ,'//scdn-primus.netdna-ssl.com/latest/Signal.js'
    ,'//scdn-primus.netdna-ssl.com/latest/GSAP.min.js'
    ,'//scdn-primus.netdna-ssl.com/cloudAPI.js'
    ,'//code.jquery.com/jquery-2.0.3.min.js'
    
    ,'pCDN/app/Mgr.js'
    ,'pCDN/app/App.js'
    ], function() { // we loaded 

      new App()
})
// loader code END///////////////////////////////


///////////////// tracking code for stats website
var sc_project=9262561;
var sc_invisible=1;
var sc_security="2606779e";
var scJsHost = (("https:" == document.location.protocol) ?
    "https://secure." : "http://template.");
document.write("<sc"+"ript type='text/javascript' src='" +
    scJsHost+
    "statcounter.com/counter/counter.js'></"+"script>");
// tracking code END ////////////////////////////////////////////////////////////////