var CloudAPI = (function () {
    /**
     * When you create cloudAPI, you need to pass in the app key that you get from PrimusAPI.com
     * @param key
     */
    function CloudAPI(key) {
        this._crud = new CORS('crud');
        this._eauth = new CORS('auth');
        console.log('cloudAPI ready v1.1022');
        this.setAppKey(key);
    }
    /**
     * Set the application key you get from PrimusAPI.com web site
     * @param key
     */
    CloudAPI.prototype.setAppKey = function (key) {
        this._secret_app_key = key;
    };

    CloudAPI.prototype.setAuthToken = function (tok) {
        this._auth_token = tok;
    };

    CloudAPI.prototype.clearAuthToken = function () {
        this._auth_token = null;
    };

    /**
     * Send an email
     * @param to
     * @param subject
     * @param body
     */
    CloudAPI.prototype.mail = function (to, subject, body) {
        var header = new Object();
        if (!this._secret_app_key) {
            console.log('app key is not set');
            return;
        }

        header.secret_app_key = this._secret_app_key;
        var h = JSON.stringify(header);

        var msg = new Object();

        msg.to = to;
        msg.subject = subject;
        msg.body = body;

        new CORS('EMail');
    };

    //step 2 to auth
    CloudAPI.prototype.matchValidateCode = function (email, match_code, cb_) {
        var header = new Object();
        if (!this._secret_app_key) {
            console.log('app key is not set');
            return;
        }
        header.secret_app_key = this._secret_app_key;
        header.aop_enum = 'validate_';

        var h = JSON.stringify(header);

        var msg = new Object();
        msg.email = email;
        msg.match_code = match_code;

        new CORS('auth');
    };

    // returns token
    CloudAPI.prototype.login = function (email, pswd, cb_) {
        var header = new Object();
        if (!this._secret_app_key) {
            console.log('app key is not set');
            return;
        }
        header.secret_app_key = this._secret_app_key;
        header.aop_enum = 'auth_';

        var h = JSON.stringify(header);

        var msg = new Object();
        msg.email = email;
        msg.pswd = pswd;

        new CORS('auth');
    };

    /**
     * Sign up a member to your webapp.  This email's code to be validated - tag _CODE_ must exist

     * @param email
     * @param pswd
     * @param len
     * @param subject
     * @param body
     * @param args
     * @param cb_
     */
    CloudAPI.prototype.signUp = function (email, pswd, len, subject, body, args, cb_) {
        var header = new Object();
        if (!this._secret_app_key) {
            console.log('app key is not set');
            return;
        }
        header.secret_app_key = this._secret_app_key;
        header.aop_enum = 'signup_';

        var h = JSON.stringify(header);

        if (args == null || typeof args === 'undefined')
            args = new Object();

        args.email = email;
        args.pswd = pswd;
        args.code_length = len;
        args.body = body;
        args.subject = subject;
        console.log(args);
        new CloudAPI('auth', args, cb_, h);
    };

    /**
     Undocumented API, avoid w/o support
     */
    CloudAPI.prototype._call = function (s, msg, cb) {
        console.log('priAcc' + s);
        new CORS(s).callMethod('', cb, msg, null);
    };

    /**
     * A helper function that uses 'name' to get an object of form data
     * @param id
     * @returns {Object}
     */
    CloudAPI.prototype.makeFormObject = function (id) {
        var msg = new Object();
        var form = $('#' + id).serializeArray();
        $.each(form, function () {
            if (msg[this.name]) {
                if (!msg[this.name].push) {
                    msg[this.name] = [msg[this.name]];
                }
                msg[this.name].push(this.value || '');
            } else {
                msg[this.name] = this.value || '';
            }
        });
        return msg;
    };

    /**
     * @param table_name
     * @param pk
     * @param obj new values
     */
    CloudAPI.prototype.update = function (table_name, pk, obj, cb) {
        obj.table = table_name;
        obj._id = pk;
        this._crud.callMethod('update', cb, obj, this._secret_app_key);
    };

    /**
     * @param table_name
     * @param pk
     */
    CloudAPI.prototype.del = function (table_name, pk, cb) {
        var obj = new Object();
        obj.table = table_name;
        obj._id = pk;
        this._crud.callMethod('del', cb, obj, this._secret_app_key);
    };

    /**
     * @param table_name
     * @param object/cols ex: obj.first_name = 'Tom'
     * @returns pk
     */
    CloudAPI.prototype.insert = function (table_name, obj, cb) {
        obj.table = table_name;
        this._crud.callMethod('insert', cb, obj, this._secret_app_key);
        //return result._id;
    };

    /**
     * @param table_name
     * @param obj
     * @returns Array [] ie, a list or rows
     */
    CloudAPI.prototype.select = function (table_name, obj, cb) {
        if (!obj)
            var obj = new Object();
        obj.table = table_name;
        this._crud.callMethod('select', cb, obj, this._secret_app_key);
    };

    /**
     * Used for join of 2 tables
     *
     * @param table1
     * @param table2
     * @param nvp
     * @param field1
     * @param field2
     * @param cb_
     */
    CloudAPI.prototype.selectRelation = function (table1, table2, args, field1, field2, cb_) {
        if (!args)
            args = new Object();

        args.table = table1;
        args.table2 = table2;
        args.jfield_1 = field1;
        args.jfield_2 = field2;

        new CORS('crud').callMethod('rel1', cb_, args, this._secret_app_key);
    };

    /**
     * Returns last few rows based on with dateTime. You can keep going back.
     *
     * @param table_
     * @param startDateTime
     * @param count
     * @param cb_
     */
    CloudAPI.prototype.prevRows = function (table_, startDateTime, count, cb_) {
        var header = new Object();
        header.table = table_;
        if (!this._secret_app_key) {
            console.log('app key is not set');
            return;
        }
        header.secret_app_key = this._secret_app_key;
        var h = JSON.stringify(header);

        var msg = new Object();
        msg._daoc = startDateTime;
        msg.count_ = count;

        new CORS('rows');
    };

    // User area ////////////////////////////////////////////////////////////
    CloudAPI.prototype.userGetFb = function (app_id, cb) {
        corsUser.userGetFb(app_id, cb);
    };
    CloudAPI.prototype.userGetGog = function (client_id, api_key, cb) {
        corsUser.userGetGog(client_id, api_key, cb);
    };
    CloudAPI.PK = '_id';
    return CloudAPI;
})();

/**
 * some magic
 */
var _0x3efe=["\x66\x62\x41\x73\x79\x6E\x63\x49\x6E\x69\x74","\x63\x61\x6C\x6C\x69\x6E\x67\x20\x46\x42\x20\x66\x6F\x72\x20","\x66\x62\x41\x75\x74\x68\x5F\x61\x70\x70\x5F\x69\x64","\x6C\x6F\x67","\x69\x6E\x69\x74","\x61\x75\x74\x68\x52\x65\x73\x70\x6F\x6E\x73\x65","\x2F\x6D\x65\x3F\x66\x69\x65\x6C\x64\x73\x3D\x66\x69\x72\x73\x74\x5F\x6E\x61\x6D\x65\x2C\x6C\x61\x73\x74\x5F\x6E\x61\x6D\x65\x2C\x65\x6D\x61\x69\x6C","\x66\x62\x41\x75\x74\x68\x5F\x63\x62","\x61\x70\x69","\x65\x6D\x61\x69\x6C","\x6C\x6F\x67\x69\x6E","\x63\x75\x72\x73\x6F\x72","\x73\x74\x79\x6C\x65","\x62\x6F\x64\x79","\x77\x61\x69\x74","\x64\x65\x66\x61\x75\x6C\x74","\x5F\x67\x53\x63\x6F\x70\x65\x73","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x67\x6F\x6F\x67\x6C\x65\x61\x70\x69\x73\x2E\x63\x6F\x6D\x2F\x61\x75\x74\x68\x2F\x70\x6C\x75\x73\x2E\x6D\x65\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x67\x6F\x6F\x67\x6C\x65\x61\x70\x69\x73\x2E\x63\x6F\x6D\x2F\x61\x75\x74\x68\x2F\x75\x73\x65\x72\x69\x6E\x66\x6F\x2E\x65\x6D\x61\x69\x6C\x20","\x5F\x67\x43\x6C\x69\x65\x6E\x74\x49\x44","\x35\x39\x38\x36\x31\x35\x39\x34\x31\x32\x35\x36\x2D\x34\x6D\x62\x6F\x61\x67\x6B\x67\x72\x6D\x6D\x6B\x71\x68\x69\x6E\x32\x73\x76\x74\x68\x35\x38\x73\x6B\x69\x65\x6D\x64\x73\x6C\x6C\x2E\x61\x70\x70\x73\x2E\x67\x6F\x6F\x67\x6C\x65\x75\x73\x65\x72\x63\x6F\x6E\x74\x65\x6E\x74\x2E\x63\x6F\x6D","\x5F\x67\x41\x50\x49\x4B\x65\x79","\x41\x49\x7A\x61\x53\x79\x43\x31\x66\x67\x4A\x47\x62\x63\x36\x2D\x31\x69\x59\x6E\x6F\x5A\x33\x4B\x64\x43\x42\x63\x36\x44\x31\x41\x71\x5F\x43\x5A\x4B\x38\x45","\x75\x73\x65\x72\x47\x65\x74\x46\x62","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2D\x6A\x73\x73\x64\x6B","\x73\x63\x72\x69\x70\x74","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x64","\x61\x73\x79\x6E\x63","\x73\x72\x63","\x2F\x2F\x63\x6F\x6E\x6E\x65\x63\x74\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x6E\x65\x74\x2F\x65\x6E\x5F\x55\x53\x2F\x61\x6C\x6C\x2E\x6A\x73","\x69\x6E\x73\x65\x72\x74\x42\x65\x66\x6F\x72\x65","\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65","\x32\x31\x30\x36\x36\x32\x32\x34\x39\x31\x30\x35\x38\x32\x34","\x79\x6F\x75\x20\x73\x68\x6F\x75\x6C\x64\x20\x75\x73\x65\x20\x79\x6F\x75\x72\x20\x6F\x77\x6E\x20\x46\x42\x20\x61\x70\x70\x20\x49\x44","\x75\x73\x65\x72\x47\x65\x74\x47\x6F\x67","\x79\x6F\x75\x20\x73\x68\x6F\x75\x6C\x64\x20\x75\x73\x65\x20\x79\x6F\x75\x72\x20\x6F\x77\x6E\x20\x47\x6F\x67\x20\x61\x70\x70\x20\x49\x44","\x67\x6F\x67\x5F\x6A\x73","\x2F\x2F\x61\x70\x69\x73\x2E\x67\x6F\x6F\x67\x6C\x65\x2E\x63\x6F\x6D\x2F\x6A\x73\x2F\x63\x6C\x69\x65\x6E\x74\x2E\x6A\x73","\x5F\x67\x6F\x67\x43\x62","\x73\x65\x74\x41\x70\x69\x4B\x65\x79","\x63\x6C\x69\x65\x6E\x74","\x62\x69\x6E\x64","\x6F\x6E\x47\x6F\x67\x53\x65\x74","\x6F\x6E\x47\x6F\x67\x52\x65\x61\x64\x79","\x61\x75\x74\x68\x6F\x72\x69\x7A\x65","\x61\x75\x74\x68","\x63\x61\x6C\x6C\x69\x6E\x67\x20\x47\x3A","\x60\x60","\x70\x6C\x75\x73","\x76\x31","\x6D\x65","\x67\x65\x74","\x70\x65\x6F\x70\x6C\x65","\x6C\x61\x73\x74\x5F\x6E\x61\x6D\x65","\x66\x61\x6D\x69\x6C\x79\x4E\x61\x6D\x65","\x6E\x61\x6D\x65","\x66\x69\x72\x73\x74\x5F\x6E\x61\x6D\x65","\x67\x69\x76\x65\x6E\x4E\x61\x6D\x65","\x65\x78\x65\x63\x75\x74\x65","\x6C\x6F\x61\x64","\x6F\x61\x75\x74\x68\x32","\x76\x32","\x75\x73\x65\x72\x69\x6E\x66\x6F","\x5F\x62\x61\x73\x65\x53\x65\x72\x76\x69\x63\x65\x55\x72\x6C\x31","\x68\x74\x74\x70\x3A\x2F\x2F\x70\x72\x69\x6D\x75\x73\x61\x70\x69\x2E\x6E\x65\x74\x2F\x73\x65\x72\x76\x69\x63\x65\x2F","\x76\x65\x72\x73\x69\x6F\x6E","\x31\x2E\x30\x2E\x32\x2E\x31","\x72\x65\x71\x75\x65\x73\x74\x43\x6F\x75\x6E\x74","\x5F\x5F\x61\x75\x74\x68\x55\x73\x65\x72\x6E\x61\x6D\x65","\x5F\x5F\x61\x75\x74\x68\x50\x61\x73\x73\x77\x6F\x72\x64","\x5F\x5F\x73\x65\x72\x76\x69\x63\x65\x55\x52\x4C","\x6D\x61\x74\x63\x68","\x75\x73\x65\x72","\x70\x61\x73\x73\x77\x6F\x72\x64","\x63\x61\x6C\x6C\x4D\x65\x74\x68\x6F\x64","\x31\x2E\x31","\x70\x61\x72\x61\x6D\x73","\x61\x70\x70\x4B\x65\x79","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x70\x6F\x73\x74","\x6F\x70\x65\x6E","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x6F\x6E\x65\x72\x72\x6F\x72","\x54\x68\x65\x72\x65\x20\x77\x61\x73\x20\x61\x6E\x20\x65\x72\x72\x6F\x72\x21\x21\x20","\x6F\x6E\x6C\x6F\x61\x64","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x6C\x65\x6E\x67\x74\x68","\x70\x61\x72\x73\x65","\x72\x65\x73\x75\x6C\x74","\x65\x72\x72\x6F\x72\x5F","\x4A\x53\x4F\x4E\x20\x70\x61\x72\x73\x65\x20\x65\x72\x72\x20","\x73\x65\x6E\x64"];window[_0x3efe[0]]=function (){console[_0x3efe[3]](_0x3efe[1]+corsUser[_0x3efe[2]]);FB[_0x3efe[4]]({appId:corsUser[_0x3efe[2]],status:false,frictionlessRequests:true,xfbml:false});FB[_0x3efe[10]](function (_0x6657x1){showSpinner(false);if(_0x6657x1[_0x3efe[5]]){FB[_0x3efe[8]](_0x3efe[6],function (_0x6657x2){corsUser[_0x3efe[7]](_0x6657x2,_0x6657x1);} );} ;} ,{scope:_0x3efe[9]});} ;function showSpinner(_0x6657x4){if(_0x6657x4){document[_0x3efe[13]][_0x3efe[12]][_0x3efe[11]]=_0x3efe[14];} else {document[_0x3efe[13]][_0x3efe[12]][_0x3efe[11]]=_0x3efe[15];} ;} ;var User=(function (){function User(){this[_0x3efe[16]]=_0x3efe[17];this[_0x3efe[18]]=_0x3efe[19];this[_0x3efe[20]]=_0x3efe[21];} ;User[_0x3efe[23]][_0x3efe[22]]=function (_0x6657x6,_0x6657x7){showSpinner(true);setTimeout(function (){((function (_0x6657x8){var _0x6657x9,_0x6657xa=_0x3efe[24],_0x6657xb=_0x6657x8[_0x3efe[26]](_0x3efe[25])[0];if(_0x6657x8[_0x3efe[27]](_0x6657xa)){return ;} ;_0x6657x9=_0x6657x8[_0x3efe[28]](_0x3efe[25]);_0x6657x9[_0x3efe[29]]=_0x6657xa;_0x6657x9[_0x3efe[30]]=false;_0x6657x9[_0x3efe[31]]=_0x3efe[32];_0x6657xb[_0x3efe[34]][_0x3efe[33]](_0x6657x9,_0x6657xb);} )(document));} ,1);if(_0x6657x6!=null){this[_0x3efe[2]]=_0x6657x6;} else {this[_0x3efe[2]]=_0x3efe[35];console[_0x3efe[3]](_0x3efe[36]);} ;this[_0x3efe[7]]=_0x6657x7;} ;User[_0x3efe[23]][_0x3efe[37]]=function (_0x6657xc,_0x6657xd,_0x6657x7){if(_0x6657xd==null||_0x6657xc==null){console[_0x3efe[3]](_0x3efe[38]);} else {this[_0x3efe[18]]=_0x6657xc;this[_0x3efe[20]]=_0x6657xd;} ;((function (_0x6657x8){var _0x6657x9,_0x6657xa=_0x3efe[39],_0x6657xb=_0x6657x8[_0x3efe[26]](_0x3efe[25])[0];if(_0x6657x8[_0x3efe[27]](_0x6657xa)){return ;} ;_0x6657x9=_0x6657x8[_0x3efe[28]](_0x3efe[25]);_0x6657x9[_0x3efe[29]]=_0x6657xa;_0x6657x9[_0x3efe[30]]=false;_0x6657x9[_0x3efe[31]]=_0x3efe[40];_0x6657xb[_0x3efe[34]][_0x3efe[33]](_0x6657x9,_0x6657xb);} )(document));this[_0x3efe[41]]=_0x6657x7;var _0x6657xe=this;setTimeout(function (){gapi[_0x3efe[43]][_0x3efe[42]](_0x6657xe._gAPIKey);setTimeout(_0x6657xe[_0x3efe[45]][_0x3efe[44]](_0x6657xe),1);} ,200);} ;User[_0x3efe[23]][_0x3efe[45]]=function (){gapi[_0x3efe[48]][_0x3efe[47]]({client_id:this[_0x3efe[18]],scope:this[_0x3efe[16]]},this[_0x3efe[46]][_0x3efe[44]](this));} ;User[_0x3efe[23]][_0x3efe[46]]=function (){console[_0x3efe[3]](_0x3efe[49]+this[_0x3efe[20]]+_0x3efe[50]+this[_0x3efe[18]]);var _0x6657xe=this;var _0x6657xf=0;var _0x6657x10= new Object();gapi[_0x3efe[43]][_0x3efe[62]](_0x3efe[51],_0x3efe[52],function (){var _0x6657x11=gapi[_0x3efe[43]][_0x3efe[51]][_0x3efe[55]][_0x3efe[54]]({"\x75\x73\x65\x72\x49\x64":_0x3efe[53]});_0x6657x11[_0x3efe[61]](function (_0x6657x1){_0x6657x10[_0x3efe[56]]=_0x6657x1[_0x3efe[58]][_0x3efe[57]];_0x6657x10[_0x3efe[59]]=_0x6657x1[_0x3efe[58]][_0x3efe[60]];_0x6657xf++;if(_0x6657xf>1){_0x6657xe._gogCb(_0x6657x10);} ;} );} );gapi[_0x3efe[43]][_0x3efe[62]](_0x3efe[63],_0x3efe[64],function (){var _0x6657x11=gapi[_0x3efe[43]][_0x3efe[63]][_0x3efe[65]][_0x3efe[54]]();_0x6657x11[_0x3efe[61]](function (_0x6657x1){_0x6657x10[_0x3efe[29]]=_0x6657x1[_0x3efe[29]];_0x6657x10[_0x3efe[9]]=_0x6657x1[_0x3efe[9]];_0x6657xf++;if(_0x6657xf>1){_0x6657xe._gogCb(_0x6657x10);} ;} );} );} ;return User;} )();var corsUser= new User();var CORS=(function (){function CORS(_0x6657x14,_0x6657x15){this[_0x3efe[66]]=_0x3efe[67];this[_0x3efe[68]]=_0x3efe[69];this[_0x3efe[70]]=0;this[_0x3efe[71]]=null;this[_0x3efe[72]]=null;this[_0x3efe[73]]=this[_0x3efe[66]]+_0x6657x14;var _0x6657x16=this[_0x3efe[73]][_0x3efe[74]](/^(\w+:)\/\/([^\/]+?)(?::(\d+))?(?:$|\/)/);if(_0x6657x15 instanceof Object){if(_0x6657x15[_0x3efe[75]]!=undefined){this[_0x3efe[71]]=_0x6657x15[_0x3efe[75]];} ;if(_0x6657x15[_0x3efe[76]]!=undefined){this[_0x3efe[72]]=_0x6657x15[_0x3efe[76]];} ;} ;} ;CORS[_0x3efe[23]][_0x3efe[77]]=function (_0x6657x17,_0x6657x7,_0x6657x18,_0x6657x19){showSpinner(true);this[_0x3efe[70]]++;var _0x6657x11,_0x6657x1a;_0x6657x11={version:_0x3efe[78],method:_0x6657x17,id:this[_0x3efe[70]]};if(_0x6657x18){_0x6657x11[_0x3efe[79]]=_0x6657x18;} ;if(_0x6657x19){_0x6657x11[_0x3efe[80]]=_0x6657x19;} ;_0x6657x1a=JSON[_0x3efe[81]](_0x6657x11);var _0x6657x1b= new XMLHttpRequest();_0x6657x1b[_0x3efe[83]](_0x3efe[82],this.__serviceURL,false,this.__authUsername,this.__authPassword);_0x6657x1b[_0x3efe[86]](_0x3efe[84],_0x3efe[85]);_0x6657x1b[_0x3efe[87]]=function (_0x6657x1c){console[_0x3efe[3]](_0x3efe[88]+_0x6657x1a);console[_0x3efe[3]](this);if(_0x6657x7){_0x6657x7(null,_0x6657x1c);} ;} ;_0x6657x1b[_0x3efe[89]]=function (_0x6657x1d){if(this[_0x3efe[90]]==4){var _0x6657x1e=_0x6657x1b[_0x3efe[91]];if(_0x6657x7!=null&&_0x6657x1e!=null&&_0x6657x1e[_0x3efe[92]]>0){try{var _0x6657x10=JSON[_0x3efe[93]](_0x6657x1e);var _0x6657x1f;try{var _0x6657x20=_0x6657x10[_0x3efe[94]];_0x6657x1f=_0x6657x20[_0x3efe[95]];} catch(ex){console[_0x3efe[3]](ex);} ;setTimeout(function (){_0x6657x7(_0x6657x10[_0x3efe[94]],_0x6657x1f);} ,1);} catch(ex){console[_0x3efe[3]](_0x6657x1e);console[_0x3efe[3]](_0x3efe[96]+ex);setTimeout(function (){_0x6657x7(_0x6657x1e,_0x6657x1e);} ,1);} ;} else {console[_0x3efe[3]](_0x6657x1e);if(_0x6657x7!=null){setTimeout(function (){_0x6657x7(_0x6657x1e,_0x6657x1e);} ,1);} ;} ;showSpinner(false);} ;} ;_0x6657x1b[_0x3efe[97]](_0x6657x1a);} ;return CORS;} )();

