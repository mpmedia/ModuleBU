declare var Mod;
declare var L;
declare var Gauge;
declare var SmoothieChart;
declare var TimeSeries;

function startApp() {
    console.log('version 0.02');
    Mod.moduleDir = 'CDN/modules/';

    Mod.domAdd('custMap.html', Mod.kontainer, onLoadedMap);
}

function onLoadedMap() {
    console.log('loaded map');

    var map = L.map('mapID', {
        //attributionControl: false
    })
    map.setView([37.9, -122.3], 6)     // 37.9, -122.3], 6

    L.tileLayer(
    'http://{s}.tile.cloudmade.com/23176814c27c42efa342d083709c8f8c/22677/256/{z}/{x}/{y}.png'
        , { maxZoom: 14
        ,minZoom:5
    }).addTo(map)

    if(true) return

    var goptions = {
        value: 34,
        label: 'Node Cache',
        unitsLabel: ' %',
        min: 0,
        max: 95,
        majorTicks: 10,
        minorTicks: 2,
        greenFrom: 15,
        greenTo: 94,
        yellowFrom: 0,
        yellowTo: 6
    }


    var gg=new Gauge( document.getElementById( 'cacheGaug' ), goptions )


    // Randomly add a data point every 500ms
    var data = new TimeSeries()
    setInterval(function() {
        data.append(new Date().getTime(), Math.random() * 600+25)
    }, 40)

    var chart
    console.log('loaded')
    chart = new SmoothieChart()
    chart.addTimeSeries(data, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 4 })
    chart.streamTo(document.getElementById('chartLate'), 1000)

    //moar

    var pop1 = L.circle([40.78, -73.95], 250, {
        color: 'blue',
        fillColor: '#f03',
        fillOpacity: 0.3
    }).addTo(map);
    var pop2 = L.circle([40.707, -74.01], 250, {
        color: 'blue',
        fillColor: '#100',
        fillOpacity: 0.3
    }).addTo(map);
}


