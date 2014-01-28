var JoinLoginSrv = (function () {
    function JoinLoginSrv(app_) {
        this._cloudAPI = new CloudAPI();
    }
    JoinLoginSrv.prototype.login = function (model, cb) {
        console.log('login srv');
        this._cloudAPI._call('JoinLogin', model, cb, null);
    };

    JoinLoginSrv.prototype.join = function (model, cb) {
        this._cloudAPI._call('JoinLogin', model, cb, null);
    };
    return JoinLoginSrv;
})();

var AccountSrv = (function () {
    function AccountSrv(app_) {
        this._cloudAPI = new CloudAPI();
    }
    AccountSrv.prototype.getApps = function (cb) {
        var msg = new Object();
        msg.account_id = this.loginDat._id;
        this._cloudAPI._call('ListApps', msg, cb, null);
    };

    AccountSrv.prototype.getApp = function (name, cb) {
        var msg = new Object();
        msg.app_name = name;
        msg.account_id = this.loginDat._id;
        console.log(JSON.stringify(msg));
        this._cloudAPI._call('App', msg, cb, null);
    };

    AccountSrv.prototype.insertNew = function (name, cb) {
        var msg = new Object();
        msg.account_id = this.loginDat._id;
        msg.app_name = name;
        $('#new_app').val('');
        this._cloudAPI._call('ListApps', msg, cb, null);
    };

    AccountSrv.prototype.saveApp = function (appName, domain, app_key, cb) {
        var msg = new Object();

        msg.app_name = appName;
        msg.account_id = this.loginDat._id;
        msg.domain = domain;
        msg.secret_app_key = app_key;

        console.log(JSON.stringify(msg));

        new CORS('App').callMethod('save', cb, msg, null);
    };
    return AccountSrv;
})();
//# sourceMappingURL=Services.js.map
