const OBJLoader = require('@loaders.gl/obj').OBJLoader
const load = require('@loaders.gl/core').load
const SimpleMeshLayer = require('@deck.gl/mesh-layers').SimpleMeshLayer
const MapboxLayer = require('@deck.gl/mapbox').MapboxLayer
const turf = require('@turf/turf')

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

let lakeshoreEast
let sc506East, sc506west; // index 1, 0

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

    loadJson('data/streetcars.geojson', (data) => {
        map.addSource('streetcar', {
            type: 'geojson',
            data: data
        })

        map.addLayer({
            id: 'streetcar',
            type: 'line',
            source: 'streetcar',
            paint: {
                "line-color": '#F44336',
                "line-width": 2
            }
        }, firstSymbolId)

        sc506East = data.features[0].geometry.coordinates
        sc506west = data.features[1].geometry.coordinates
    })

    loadJson('data/tracks.geojson', (data) => {
        map.addSource('train', {
            type: 'geojson',
            data: data
        });

        lakeshoreEast = data.features[1]

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

        var first = false;
<<<<<<< HEAD
=======
        var loadOnce = false;

>>>>>>> 8a9d38fc3d6ae8ab81eb2548287d0bca1502f538
        loadObj((data) => {
            const ws = new WebSocket("ws://trajectory.herokuapp.com/")
            ws.addEventListener('open', () => {

            })

            let oldData
            let interval

            ws.addEventListener('message', (event) => {
                const transitData = JSON.parse(event.data);
                console.log(transitData);
                if (!loadOnce) {

                    Object.keys(transitData.train).forEach((unit) => {
                        if (!first) {
                            document.getElementById('train-car').innerHTML += (`<div class="carousel-item active">
                                <div class="card mb-2">
                                    <div class="card-body">
                                        <h4 class="card-title">go train</h4>
                                        <hr style="border-top: 4px solid #256C2F">
                                        <p class="card-text">
                                            ${transitData.train[unit].id}
                                        </p>
                                        <p class="card-text">
                                            direction -> oshawa
                                        </p>
                                        <p class="card-text">
                                            next station -> ${transitData.train[unit].nextStation.toLowerCase()}
                                        </p>
                                        <p id="card-delay-${unit}" class="card-text">
<<<<<<< HEAD
                                            delay -> ${(Number(transitData.train[unit].delay) < 0 ? `${Math.abs(Number(transitData.train[unit].delay))}s early` : `${transitData.train[unit].delay}s late`)}
                                        </p>
                                        <a onClick="setBounds(${transitData.train[unit].location[0]}, ${transitData.train[unit].location[1]})" class="btn btn-primary" style="float: right">follow</a>
=======
                                            delay -> ${(Number(transitData.train[unit].delay) < 0 ? `${Math.abs(Number(transitData.train[unit].delay))}s early` : `${transitData.train[unit].delay}s late` )}
                                        </p>
                                        <a class="btn btn-primary" style="float: right">follow</a>
>>>>>>> 8a9d38fc3d6ae8ab81eb2548287d0bca1502f538
                                    </div>
                                </div>
                            </div>`)
                            first = true;
                        } else {
                            document.getElementById('train-car').innerHTML += (`
                            <div class="carousel-item">
                                <div class="card mb-2">
                                    <div class="card-body">
                                        <h4 class="card-title">go train</h4>
                                        <hr style="border-top: 4px solid #256C2F">
                                        <p class="card-text">
                                            ${transitData.train[unit].id}
                                        </p>
                                        <p class="card-text">
                                            direction ->
                                        </p>
                                        <p class="card-text">
                                            next station -> ${transitData.train[unit].nextStation.toLowerCase()}
                                        </p>
                                        <p id="card-delay-${unit}" class="card-text">
<<<<<<< HEAD
                                            delay -> ${(Number(transitData.train[unit].delay) < 0 ? `${Math.abs(Number(transitData.train[unit].delay))}s early` : `${transitData.train[unit].delay}s late`)}
                                        </p>
                                        <a onClick="setBounds(${transitData.train[unit].location[0]}, ${transitData.train[unit].location[1]})" class="btn btn-primary" style="float: right">follow</a>
=======
                                            delay -> ${(Number(transitData.train[unit].delay) < 0 ? `${Math.abs(Number(transitData.train[unit].delay))}s early` : `${transitData.train[unit].delay}s late` )}
                                        </p>
                                        <a class="btn btn-primary" style="float: right">follow</a>
>>>>>>> 8a9d38fc3d6ae8ab81eb2548287d0bca1502f538
                                    </div>
                                </div>
                            </div>
                            `)
                        }
                    });
                }

                loadOnce = true;
<<<<<<< HEAD

                Object.keys(transitData.train).forEach((unit) => {
                    document.getElementById(`card-delay-${unit}`).innerText = `delay -> ${(Number(transitData.train[unit].delay) < 0 ? `${Math.abs(Number(transitData.train[unit].delay))}s early` : `${transitData.train[unit].delay}s late`)}`;
=======
                
                Object.keys(transitData.train).forEach((unit) => {
                    document.getElementById(`card-delay-${unit}`).innerText = `delay -> ${(Number(transitData.train[unit].delay) < 0 ? `${Math.abs(Number(transitData.train[unit].delay))}s early` : `${transitData.train[unit].delay}s late` )}`;
>>>>>>> 8a9d38fc3d6ae8ab81eb2548287d0bca1502f538
                })

                if (interval !== undefined) {
                    window.cancelAnimationFrame(interval)
                }
                oldData = JSON.parse(event.data)
                let startTime = Date.now()
                callback = () => {
                    let endTime = Date.now()
                    let delta = endTime - startTime
                    startTime = endTime

                    let lineString = turf.lineString(lakeshoreEast.geometry.coordinates[0])

                    oldData.train = oldData.train.map((train) => {
                        let nearestPoint = turf.nearestPointOnLine(lineString, [train.location[1], train.location[0]]).geometry.coordinates

                        if (train.distanceAnim === undefined) {
                            console.log(lineString.geometry.coordinates[0])
                            train.distanceAnim = turf.length(turf.lineSlice(lineString.geometry.coordinates[0], nearestPoint, lineString))
                        } else {
<<<<<<< HEAD
=======
                            let endTime = Date.now()
                            let delta = endTime - startTime
                            startTime = endTime
>>>>>>> 8a9d38fc3d6ae8ab81eb2548287d0bca1502f538
                            let speed = train.distance / (Math.abs(train.arrivalTime - Date.now()) / 1000)
                            train.distanceAnim += speed * delta / 1000
                        }

                        return train
                    })

                    let trainData = oldData.train.flatMap((train) => {
                        let distance = train.distanceAnim

                        let output = []
                        let start = distance
                        let end = distance + 0.001
                        if (start > 0 && end > 0) {
                            for (let i = 0; i < 12; i++) {
                                let a = turf.along(lineString, start)
                                let b = turf.along(lineString, end)
                                let bearing = turf.bearing(a, b)

                                start += 0.02951
                                end += 0.02951

                                output.push({
                                    position: a.geometry.coordinates,
                                    angle: bearing
                                })
                            }
                        }

                        return output
<<<<<<< HEAD
                    })
=======
                    }
                    )
>>>>>>> 8a9d38fc3d6ae8ab81eb2548287d0bca1502f538

                    if (map.getLayer('trains') != null) {
                        map.removeLayer('trains')
                    }
                    map.addLayer(new MapboxLayer({
                        type: SimpleMeshLayer,
                        data: trainData,
                        id: 'trains',
                        getOrientation: (obj) => [0, turf.degreesToRadians(obj.angle), 0],
                        mesh: data,
<<<<<<< HEAD
                        getColor: [0, 0, 255]
                    }))

                    try {
                        if (sc506East !== undefined) {
                            var a = animateStreetcars(oldData.streetcar.filter(x => x.direction == 0), sc506west, "0", data, delta)
                            var b = animateStreetcars(oldData.streetcar.filter(x => x.direction == 1), sc506west, "1", data, delta)
                            oldData.streetcar = [...a, ...b]
                        }
                    }
                    catch (e) {
                        console.log(e)
=======
                        getColor: [255, 0, 0]
                    }))

                    if (sc506East !== undefined) {
                        var a = animateStreetcars(oldData.streetcar.filter(x => x.direction == 0), sc506west, "0", data)
                        var b = animateStreetcars(oldData.streetcar.filter(x => x.direction == 1), sc506west, "1", data)
                        oldData.streetcar = [...a,...b]                    
>>>>>>> 8a9d38fc3d6ae8ab81eb2548287d0bca1502f538
                    }

                    requestAnimationFrame(callback)
                }
                interval = window.requestAnimationFrame(callback)
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

<<<<<<< HEAD
function animateStreetcars(streetcars, line, id, data, delta) {
=======
function animateStreetcars(streetcars, line, id, data) {
>>>>>>> 8a9d38fc3d6ae8ab81eb2548287d0bca1502f538
    let lineString = turf.lineString(line)

    streetcars = streetcars.map((train) => {
        let nearestPoint = turf.nearestPointOnLine(lineString, [train.location[1], train.location[0]]).geometry.coordinates

        if (train.distanceAnim === undefined) {
            console.log(lineString.geometry.coordinates[0])
            train.distanceAnim = turf.length(turf.lineSlice(lineString.geometry.coordinates[0], nearestPoint, lineString))
        } else {
<<<<<<< HEAD
            train.distanceAnim += 0.009333 * delta / 1000
=======
            train.distanceAnim += 0.0138888889
>>>>>>> 8a9d38fc3d6ae8ab81eb2548287d0bca1502f538
        }

        return train
    })

    let trainData = streetcars.map((train) => {
        let distance = train.distanceAnim

        let start = distance
        let end = distance + 0.001
        if (start > 0 && end > 0) {
            let a = turf.along(lineString, start)
            let b = turf.along(lineString, end)
            let bearing = turf.bearing(a, b)

            return {
                position: a.geometry.coordinates,
                angle: bearing
            }
        }
    }
<<<<<<< HEAD
    ).filter(x => x !== undefined)
=======
    )
>>>>>>> 8a9d38fc3d6ae8ab81eb2548287d0bca1502f538

    if (map.getLayer('streetcar' + id) != null) {
        map.removeLayer('streetcar' + id)
    }
    map.addLayer(new MapboxLayer({
        type: SimpleMeshLayer,
        data: trainData,
        id: 'streetcar' + id,
        getOrientation: (obj) => [0, obj.angle, 0],
        mesh: data,
        getColor: [255, 0, 0]
    }))

    return streetcars
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

    // map.fitBounds([
    //     [
    //         32.958984,
    //         -5.353521
    //     ],
    //     [
    //         43.50585,
    //         5.615985
    //     ]
    // ]);
}

window.setBounds = function(y, x) {
    console.log('TESSSSt', x, y)
    map.fitBounds([
        [x - 0.01, y - 0.01],[x + 0.01, y + 0.01]
    ])
}