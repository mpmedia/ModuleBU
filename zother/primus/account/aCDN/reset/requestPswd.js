document.body.style.cursor = 'wait';
require([
    '//code.jquery.com/jquery-2.0.3.min.js',
    '//scdn-primus.netdna-ssl.com/latest/ModuleBU.js',
    '//scdn-primus.netdna-ssl.com/cloudAPI.js'
], function () {
    showSpinner(false);
});

//start
var but = document.getElementById('resetBut');
but.addEventListener('click', function () {
    onSendClicked();
}, false);

function onSendClicked() {
    console.log('save ');

    var msg = new Object();
    msg.email = $('#email').val();

    new CloudAPI()._call('resetPswd', msg, _onRetSaved);
    $('#saved').show();
}

function _onRetSaved(data_, errorString) {
    setTimeout(function () {
        AppBU.goLocation('http://primusAPI.com');
    }, 7 * 1000);
}
//# sourceMappingURL=requestPswd.js.map
