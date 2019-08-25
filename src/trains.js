const {
  MapboxLayer,
  ScatterplotLayer
} = deck;

mapboxgl.accessToken = '<mapbox-access-token>';

const map = new mapboxgl.Map({
  container: document.getElementById('map-box'),
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-122.4, 37.79],
  zoom: 15,
  pitch: 60
});

map.on('load', () => {
  const firstLabelLayerId = map.getStyle().layers.find(layer => layer.type === 'symbol').id;

  map.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',

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
  }, firstLabelLayerId);

  map.addLayer(new MapboxLayer({
    id: 'deckgl-circle',
    type: ScatterplotLayer,
    data: [{
      position: [-122.402, 37.79],
      color: [255, 0, 0],
      radius: 1000
    }],
    getPosition: d => d.position,
    getColor: d => d.color,
    getRadius: d => d.radius,
    opacity: 0.3
  }), firstLabelLayerId);

  map.addLayer(new MapboxLayer({
    id: 'deckgl-arc',
    type: ArcLayer,
    data: [{
      source: [-122.3998664, 37.7883697],
      target: [-122.400068, 37.7900503]
    }],
    getSourcePosition: d => d.source,
    getTargetPosition: d => d.target,
    getSourceColor: [255, 208, 0],
    getTargetColor: [0, 128, 255],
    getStrokeWidth: 8
  }))
});