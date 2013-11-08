

class NameForm implements IViewMgr {
    constructor() {// when created via new
        var but1 = document.getElementById('formId')
        but1.addEventListener('click', this.clicked.bind(this) )
    }
    private clicked(transEnum:number, ctx:any):void {
        forward('nameForm', 'form', this.onFormLoaded.bind(this) )
        // is DOM loaded here??
    }
    onFormLoaded(new_id){
        console.log(new_id)
        cleanUpViews(1)// remove other views in kontainer
        var but1 = document.getElementById('create')
        but1.addEventListener('click', this.doInsert.bind(this) )
    }
    doInsert() {
        console.log('ins')
        var firstname = $('#firstname').val()
        var lastname = $('#lastname').val()
        console.log('clicked ' + firstname +', ' + lastname)
        var ename = new Object()
        ename.first_name=firstname
        ename.last_name=lastname
        cors.insert('my_table',ename, this.onPK.bind(this) )
    }
    onPK(data, er){
        console.log('back ' + JSON.stringify(data) + er)
    }
}//class

class Templ implements IViewMgr {
    constructor() {
        var but1 = document.getElementById('transparencyBut')
        but1.addEventListener('click', this.clicked.bind(this) )
    }
    private clicked(transEnum:number, ctx:any):void {
        forward('trans2', 'transId', this.onLoaded.bind(this))
    }
    onLoaded(nid) {
        cleanUpViews(1)
        cors.select('my_table', null, this.onSelectRet.bind(this))
    }
    onSelectRet(data, er) {
        console.log('back2 ' + JSON.stringify(data) + er)
        Transparency.render(document.getElementById('template'), data.array_);
        //$('#template').render(data.array_);
    }
}

class App {

    constructor() {
        ModDir = 'Mods/'
        console.log('v0.06')
        cors = new CloudAPI('fiasqrx5mli')

        var templ = new Templ()
        var frm  = new NameForm()
    }
}
