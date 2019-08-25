const OBJLoader = require('@loaders.gl/obj').OBJLoader
const load = require('@loaders.gl/core').load
const SimpleMeshLayer = require('@deck.gl/mesh-layers').SimpleMeshLayer
const MapboxLayer = require('@deck.gl/mapbox').MapboxLayer

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVsbGlzZCIsImEiOiJjam9obzZpMDQwMGQ0M2tsY280OTh2M2o5In0.XtnbkAMU7nIMkq7amsiYdw'
//mapboxgl.accessToken = 'pk.eyJ1IjoiZGVsbGlzZCIsImEiOiJjandmbGc5MG8xZGg1M3pudXl6dTQ3NHhtIn0.6eYbb2cN8YUexz_F0ZCqUQ';
// let map = null = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/light-v9',
//     center: [-75.6294, 45.3745], 
//     zoom: 11, 
//     bearing: -30,
//     hash: true
// });

let map = null;

document.addEventListener('DOMContentLoaded', () => {
    loadMap()
})

let toggleOptions = {
    dark: true,
    satellite: false,
    stage3west: false,
    stage3south: false,
    stage3north: false
}

/**
 * Read the current state of toggle options from the url params and/or the url bar
 * URL params override local storage data, except for dark mode (which isn't present in url)
 * Satellite view overrides dark mode in all cases
 */
function syncToggleOptionsState() {
    // Dark mode
    let mql = window.matchMedia('(prefers-color-scheme: dark)')
    if (mql.matches) {
        toggleOptions.dark = true;
    } else if ('dark' in localStorage) {
        toggleOptions.dark = localStorage['dark']
    }

    mql.addListener((media) => {
        if (!toggleOptions.satellite) {
            toggleOptions.dark = media.matches
        }
    })
}

let firstSymbolId;
let count = 0;

let train, bus, streetcar, subway;

async function loadObj(callback) {
    const data = await load('data/coach.obj', OBJLoader)
    callback(data)
}

function setupDataDisplay() {

    let layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }

    loadJson('data/train.geojson', (data) => {
        map.addSource('train', {
            type: 'geojson',
            data: data
        });

        map.addLayer({
            id: "train",
            type: "line",
            source: 'train',
            filter: ['!=', 'name', 'Outline'],
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": '#256C2F',
                "line-width": 2
            }
        }, firstSymbolId);

        loadObj((data) => {
            const ws = new WebSocket("ws://trajectory.herokuapp.com/")
            ws.addEventListener('open', () => { })

            ws.addEventListener('message', (event) => {
                console.log(event.data)
                for (let train of JSON.parse(event.data).streetcar) {
                    if (map.getLayer(`train-${train.id}`) == null) {
                        let layer = new MapboxLayer({
                            type: SimpleMeshLayer,
                            data: [
                                {
                                    position: [train.location[1], train.location[0]],
                                    angle: train.angle
                                }
                            ],
                            id: `train-${train.id}`,
                            mesh: data,
                            getColor: [255, 0, 0],
                        })
                        map.addLayer(layer)
                    } else {
                        let layer = map.getLayer(`train-${train.id}`)

                        layer.setProps({
                            data: {
                                position: [train.location[1], train.location[0]],
                                angle: train.angle
                            }
                        })
                    }
                }
            })
        })
    })

    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#333',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
                "interpolate", ["linear"],
                ["zoom"],
                15, 0,
                15.05, ["get", "height"]
            ],
            'fill-extrusion-base': [
                "interpolate", ["linear"],
                ["zoom"],
                15, 0,
                15.05, ["get", "min_height"]
            ],
            'fill-extrusion-opacity': .6
        }
    }, firstSymbolId);
}

function clearData() {
    map.removeLayer('belfast')
    map.removeLayer('walkley')
    map.removeLayer('moodie')

    removeLine('confederation')
    removeLine('confederation-east')
    removeLine('confederation-west')
    removeLine('trillium')
}

function removeLine(name) {
    map.remove(`${name}-tracks`)
    map.remove(`${name}-platforms`)
    map.remove(`${name}-labels`)
    map.remove(`${name}-labels-hover`)
}

function loadLine(line, name) {
    map.addSource(name, {
        'type': 'geojson',
        attribution: 'Data: City of Ottawa',
        data: line
    });

    map.addLayer({
        id: `${name}-tracks`,
        type: 'line',
        source: name,
        filter: ['==', 'type', 'tracks'],
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": ['get', 'color'],
            "line-width": 3
        }
    }, firstSymbolId);

    map.addLayer({
        id: `${name}-platforms`,
        type: 'fill',
        source: name,
        filter: ['==', 'type', 'station-platforms'],
        paint: {
            "fill-color": ['get', 'color'],
            'fill-opacity': 0.6
        }
    });

    map.addLayer({
        id: `${name}-labels`,
        type: 'symbol',
        source: name,
        filter: ['==', 'type', 'station-label'],
        minzoom: 10,
        layout: {
            //"text-field": "{OBJECTID}"
            "icon-image": "station",
            "text-field": "{name}",
            "text-anchor": "left",
            "text-offset": [0.75, 0],
            "text-optional": true,
            "icon-optional": false,
            "icon-allow-overlap": true,
            "text-size": 14
        },
        paint: {
            "text-halo-width": 1,
            "text-color": toggleOptions.dark ? "#FFFFFF" : "#212121",
            "text-halo-color": toggleOptions.dark ? "#212121" : "#FFFFFF"
        }
    });

    map.addLayer({
        id: `${name}-labels-hover`,
        type: 'symbol',
        source: name,
        minzoom: 10,
        filter: ['all', ['==', 'name', ""],
            ['==', 'type', 'station-label']
        ],
        layout: {
            "text-field": "{name}",
            "text-anchor": "left",
            "text-offset": [0.75, 0],
            "text-allow-overlap": true,
            "text-size": 14
        },
        paint: {
            "text-halo-width": 1,
            "text-color": toggleOptions.dark ? "#FFFFFF" : "#212121",
            "text-halo-color": toggleOptions.dark ? "#212121" : "#FFFFFF"
        }
    });

    map.on('click', `${name}-labels`, (e) => {
        if (e.features[0].properties.url != null) {
            window.parent.location.href = `https://www.otrainfans.ca/${e.features[0].properties.url}`
        }
    })

    let lastFeatureId;
    // Using mousemove is more accurate than mouseenter/mouseleave for hover effects
    map.on('mousemove', (e) => {
        let fs = map.queryRenderedFeatures(e.point, {
            layers: [`${name}-labels`]
        });
        if (fs.length > 0) {
            map.getCanvas().style.cursor = 'pointer';

            let f = fs[0];
            if (f.properties.name !== lastFeatureId) {
                lastFeatureId = f.properties.name;

                // Show this element on the "hover labels" layer
                map.setFilter(`${name}-labels-hover`, ['all', ['==', 'name', f.properties.name],
                    ['==', 'type', 'station-label']
                ]);
            }
        } else {
            map.getCanvas().style.cursor = '';
            // Reset the "hover labels" layer
            map.setFilter(`${name}-labels-hover`, ['all', ['==', 'name', ""],
                ['==', 'type', 'station-label']
            ]);
            lastFeatureId = undefined;
        }
    });

}

function getLngLatFromFeatures(features) {
    let points = [];
    for (let feature of features.filter((e) => e.properties.type === "station-label")) {
        points.push(feature.geometry.coordinates)
    }

    return points;
}

function loadMap(style = "mapbox://styles/mapbox/dark-v9") {
    if (map != null) {
        map.remove()
    }

    map = new mapboxgl.Map({
        container: 'map-container',
        style: style,
        center: [-79.395540, 43.664166],
        zoom: 11,
        bearing: -30,
        hash: true
    })

    map.on('load', () => {
        setupDataDisplay()
    })
}
