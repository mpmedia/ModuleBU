function startApp() {
    console.log('version 0.001a');
    Mod.moduleDir = 'CDN/modules/';

    //set up route/hash/ctrl
    AppBU.route(onRoute);
    AppBU.initPosSignal().add(onScroll);
    AppBU.initMouseSignal().add(onMouse);

    // just for now
    Mod.domAdd('AboutPg.html', kontainer);
}

function onScroll(cv) {
    console.log(cv);
    var el = document.getElementById('someItem');
    var vis = Mod.isInView(el.getBoundingClientRect(), cv);
    console.log(vis);
}

function onRoute(hash) {
    console.log(hash);
    Mod.domRem(kontainer, 0);
    Mod.domAdd('HomePg.html', kontainer, onLoadedBindTemplate);
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
