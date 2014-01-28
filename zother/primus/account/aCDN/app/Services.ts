
class JoinLoginSrv {
    private _cloudAPI:CloudAPI = new CloudAPI()
    constructor(app_:App) {
    }

    login(model:Object, cb:any) {
        console.log('login srv')
        this._cloudAPI._call('JoinLogin', model, cb ,null)
    }

    join(model:Object, cb:any) {
        this._cloudAPI._call('JoinLogin', model, cb,null)
    }
}

class AccountSrv {//Account services
    loginDat:Object;
    list:Array;
    row:Object;

    private _cloudAPI:CloudAPI = new CloudAPI()
    constructor(app_:App) {
    }

    getApps(cb) {
        var msg:Object = new Object()
        msg.account_id = this.loginDat._id
        this._cloudAPI._call('ListApps', msg, cb,null)
    }

    getApp(name:string,cb) {
        var msg:Object = new Object()
        msg.app_name=name
        msg.account_id =  this.loginDat._id
        console.log(JSON.stringify(msg))
        this._cloudAPI._call('App', msg, cb,null)
    }

    insertNew(name:string,cb) { //this.onRet.bind(this)
        var msg:Object = new Object()
        msg.account_id =  this.loginDat._id
        msg.app_name = name//
        $('#new_app').val('')
        this._cloudAPI._call('ListApps', msg, cb ,null)
    }

    saveApp(appName:string, domain:string, app_key:string, cb) {
        var msg:Object = new Object()

        msg.app_name=appName
        msg.account_id =  this.loginDat._id
        msg.domain = domain
        msg.secret_app_key = app_key

        console.log(JSON.stringify(msg))

        new CORS('App').callMethod('save', cb, msg, null)

    }

}
