console.log('ready 0.1');
ModDir = 'Mods/';

var load1But = document.getElementById('load1');
load1But.addEventListener('click', onclickone);
function onclickone() {
    console.log('I just got clicked thank you');
    open('view1', 'body', iloaded1);
    console.log('is it loaded?');
}
function iloaded1() {
    console.log('loaded1');
}

var load2But = document.getElementById('load2');
load2But.addEventListener('click', function () {
    console.log('Test');
    open('view2', 'body', function () {
        console.log('loaded 2');
    });
});

bG.ModDir = '';

bG.domAdd('index.html', document.getElementById('kontainer'), function () {
    console.log('loaded');
});

bG.domRem(document.getElementById('content'), 1);
//# sourceMappingURL=app.js.map
