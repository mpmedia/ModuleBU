console.log('loaded av1');

var JoinLogin = (function () {
    function JoinLogin(app_) {
        this.app = app_;
        this.srv = new JoinLoginSrv(app_);
        Mod.domAdd('JoinLogin.html', document.getElementById('kontainer'), this.onLoaded.bind(this));
    }
    JoinLogin.prototype.resetPassword = function () {
        console.log('reset');
        AppBU.goLocation('aCDN/reset/requestPswd.html');
    };
    JoinLogin.prototype.onLoaded = function () {
        var Lbut = document.getElementById('loginBut');
        Lbut.addEventListener('click', this.onLogBut.bind(this));

        var jbut = document.getElementById('joinBut');
        jbut.addEventListener('click', this.onJoinBut.bind(this));

        var resetPassword = document.getElementById('resetPassword');
        resetPassword.addEventListener('click', this.resetPassword.bind(this));
    };
    JoinLogin.prototype.onLogBut = function () {
        var loginModel = this.getLoginModel();
        console.log(loginModel);
        if (loginModel == null)
            return;
        this.srv.login(loginModel, this.onLoginRet.bind(this));
    };
    JoinLogin.prototype.onLoginRet = function (data, er) {
        if (typeof er != 'undefined') {
            console.log(er);
            $('#loginEmailError').show();
            return;
        }
        $('#loginEmailError').hide();

        //console.log(data)
        this.app.showAccount(data);
    };
    JoinLogin.prototype.getLoginModel = function () {
        var email = $('#email').val();
        if (!OtherUT.isEmailValid(email)) {
            $('#loginEmailError').show();
            return null;
        }
        $('#loginEmailError').hide();

        var msg = new Object();
        msg.pswd = $('#password').val();
        msg.email = email;
        return msg;
    };

    JoinLogin.prototype.onJoinRet = function (data, er) {
        console.log(er);
        if (typeof er != 'undefined') {
            $('#customEr').text(er);
            return;
        }
        this.app.showAccount(data);
    };
    JoinLogin.prototype.onJoinBut = function () {
        console.log('join click');
        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        if (typeof first_name == 'undefined' || typeof last_name == 'undefined') {
            $('#nameError').show();
            return null;
        }
        if (first_name.length < 2 || last_name.length < 2) {
            $('#nameError').show();
            return null;
        }
        $('#nameError').hide();

        var email = $('#Jemail').val();
        if (!OtherUT.isEmailValid(email)) {
            $('#signupEmailError').show();
            return null;
        }
        $('#signupEmailError').hide();

        var terms = $('#terms').is(":checked");
        console.log(terms);
        if (!terms) {
            $('#termsError').show();
            return null;
        }
        $('#termsError').hide();

        var pswd = $('#Jpassword').val();
        var pswd2 = $('#Jpassword2').val();
        if (pswd != pswd2 || pswd.length < 2) {
            $('#notMatching').show();
            return null;
        }
        $('#notMatching').hide();

        var msg = new Object();
        msg.first_name = first_name;
        msg.last_name = last_name;
        msg.pswd = pswd;
        msg.pswd2 = pswd2;
        msg.email = email;
        msg.promo_code = $('#promo_code').val();

        this.srv.join(msg, this.onJoinRet.bind(this));
        return;
    };
    return JoinLogin;
})();

function onClick(id, func) {
    var but = document.getElementById(id);
    but.addEventListener('click', function (evt) {
        evt.preventDefault();
        func(id);
    });
}

var Account = (function () {
    function Account(data, app_) {
        this.srv = new AccountSrv(app_);
        this.app = app_;
        this.srv.loginDat = data;
        Mod.domAdd('Account.html', document.getElementById('kontainer'), this.onLoaded.bind(this));
        Mod.domRem(document.getElementById('kontainer'), 0);
        document.body.style.cursor = 'default';
    }
    Account.prototype.onLoaded = function () {
        var newBut = document.getElementById('newAppBut');
        newBut.addEventListener('click', this.onNew.bind(this));
        var temp = document.getElementById('template');
        temp.addEventListener('click', this.onClicked.bind(this));
        var dataviewBut = document.getElementById('dataviewBut');
        dataviewBut.addEventListener('click', function (e) {
            AppBU.goLocation('http://ca_1.primusAPI.com/dataView');
        });

        AppBU.onClick('saveBut', this.onSave.bind(this));

        this.srv.getApps(this.onRet.bind(this));
        this.srv.getApp('firstapp', this.onAppData.bind(this));
    };

    Account.prototype.onRet = function (data) {
        this.srv.list = data.array_;
        var data = this.srv.list;
        console.log(data);
        $.fn.render = Transparency.jQueryPlugin;
        $('#template').render(data);
    };

    Account.prototype.onClicked = function (e) {
        //console.log(e)
        var name = e.target.textContent;
        this.srv.getApp(name, this.onAppData.bind(this));
    };

    Account.prototype.onAppData = function (dat) {
        this.srv.row = dat;

        //console.log(dat)
        $('#app_name').val(dat.app_name);
        $('#app_key').val(dat.secret_app_key);
        $('#domain').val(dat.domain);
    };

    Account.prototype.onNew = function () {
        this.srv.insertNew($('#new_app').val(), this.onRet.bind(this));
    };

    Account.prototype.onSave = function (id) {
        console.log('save clicked' + id);
        this.srv.saveApp($('#app_name').val(), $('#domain').val(), $('#app_key').val(), this.onRet.bind(this));
    };
    return Account;
})();

var App = (function () {
    function App() {
        Mod.moduleDir = 'aCDN/modules/';
        console.log('0.4');

        this.loadFirst();
        Mod.showSpinner(false);
    }
    App.prototype.showAccount = function (data) {
        new Account(data, this);
    };

    App.prototype.loadFirst = function () {
        new JoinLogin(this);
    };
    return App;
})();//class

//# sourceMappingURL=Acct.js.map
