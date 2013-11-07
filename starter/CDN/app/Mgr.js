function startApp() {
    console.log('version 0.001a');
    ModuleMA.moduleDir = 'CDN/modules/';

    //set up route/hash/ctrl
    AppBU.route(this.onRoute.bind(this));
    AppBU.initPosSignal().add(onScroll);
    AppBU.initMouseSignal().add(onMouse);

    // just for now
    ModuleMA.domAdd('AboutPg.html', kontainer);
}

function onScroll(cv) {
    console.log(cv);
    var el = document.getElementById('someItem');
    var vis = ModuleMA.isInView(el.getBoundingClientRect(), cv);
    console.log(vis);
}

function onRoute(hash) {
    console.log(hash);
    ModuleMA.domRem(kontainer, 0);
    ModuleMA.domAdd('HomePg.html', kontainer, onLoadedBindTemplate);
}

function onLoadedBindTemplate() {
    var rows = [
        { name: 'Jonny', city: 'Stockholm' },
        { name: 'Jonas', city: 'Berlin' }
    ];

    //transparency.js
    Transparency.render(document.getElementById('binding'), rows);
}

function onMouse(mx, my) {
    console.log(mx, my);
}
//# sourceMappingURL=Mgr.js.map
