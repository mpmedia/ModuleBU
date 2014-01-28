document.body.style.cursor = 'wait';
require([
    '//code.jquery.com/jquery-2.0.3.min.js',
    '//scdn-primus.netdna-ssl.com/latest/ModuleBU.js',
    '//scdn-primus.netdna-ssl.com/cloudAPI.js'
], function () {
    showSpinner(false);
});

var but = document.getElementById('saveBut');
but.addEventListener('click', function () {
    onSavedClicked();
});

function onSavedClicked() {
    console.log('save ');
    var pswd = $('#loginPswd').val();
    var pswd2 = $('#loginPswd2').val();

    if (pswd != pswd2) {
        $('#notMatching').show();
        return;
    }
    $('#notMatching').hide();

    var msg = new Object();
    msg.pswd = pswd;
    msg.reset = getGuerryString('reset');
    msg.reset_token = getGuerryString('reset_token');

    new CloudAPI()._call('resetPswd', msg, _onRetSaved, null);
    $('#saved').show();
}

function _onRetSaved(data_, errorString) {
    console.log('L');
    console.log(JSON.stringify(data_));
    setTimeout(function () {
        AppBU.goLocation('http://primusAPI.com');
    }, 8 * 1000);
}
//# sourceMappingURL=resetPswd2.js.map
