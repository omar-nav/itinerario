var mymap = L.map('mapid').setView([19.392784, -99.144683], 12);

let streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoib21hci1uYXZhcnJvIiwiYSI6ImNpanN2ZWZxZzBoa291eWx4ZWdsajl1OGIifQ.SH4OG9811nirTGJ3rE4DHw'
}).addTo(mymap);
let dark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.dark',
  accessToken: 'pk.eyJ1Ijoib21hci1uYXZhcnJvIiwiYSI6ImNpanN2ZWZxZzBoa291eWx4ZWdsajl1OGIifQ.SH4OG9811nirTGJ3rE4DHw'
});
let luz = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.light',
  accessToken: 'pk.eyJ1Ijoib21hci1uYXZhcnJvIiwiYSI6ImNpanN2ZWZxZzBoa291eWx4ZWdsajl1OGIifQ.SH4OG9811nirTGJ3rE4DHw'
});
let satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.satellite',
  accessToken: 'pk.eyJ1Ijoib21hci1uYXZhcnJvIiwiYSI6ImNpanN2ZWZxZzBoa291eWx4ZWdsajl1OGIifQ.SH4OG9811nirTGJ3rE4DHw'
});


var baseLayers = {
  "Calles": streets,
  "Oscuro": dark,
  "Luz": luz,
  "Satélite": satellite
};

var geojson = L.control.layers(baseLayers).addTo(mymap);



// COLORES
function qualitativeColors(d) {
  return d === "0" ? '#e41a1c' :
    d === "1" ? '#377eb8' :
      '#000000';
}

// PINTAR LAS FIGURAS CON LOS COLORES
function styleItinerary(feature) {
  return {
    weight: .75,
    opacity: 0.5,
    color: 'grey',
    dashArray: '0',
    fillOpacity: 0.9,
    fillColor: qualitativeColors(feature.properties.ESTADO_CHE)
  }
}

// CREAR CAJAS AL MOMENTO DE HACER CLIC
function geojsonPopupItinerary(feature, layer) {
  if (feature.properties.NOMBRE) {
    return layer.bindPopup('<b>Nombre</b>:   ' + feature.properties.NOMBRE + '<br><b>hizo check-in a las:</b> ' + feature.properties.FECHA_CHEC +
      '<br><b>Descripción:</b> ' + feature.properties.DESCRPICIO)
  }
}

// CREAR VARIABLES PARA LAS CAPAS
// DEL MISMO ARCHIVO JSON
var ItinerarioLayer = L.geoJSON(itinerario, {
  style: styleItinerary,
  onEachFeature: geojsonPopupItinerary,
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng);
  }
});
// dibujar al mapa
ItinerarioLayer.addTo(mymap);

function connectTheDots(data, index) {
  var c = [];
  for (i in data._layers) {
    if (data._layers[i].feature.properties.ID_ITINERA === index) {
      var x = data._layers[i]._latlng.lat;
      var y = data._layers[i]._latlng.lng;
      c.push([x, y]);
    }
  }
  // return line
  return c;
}

// start drawing lines
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
let allWorkNumbers = [];
// store all work numbers into array
for (i in ItinerarioLayer._layers) {
  let workNumber = ItinerarioLayer._layers[i].feature.properties.ID_ITINERA
  allWorkNumbers.push(workNumber);
}
let uniqueWorkNumbers = allWorkNumbers.filter(onlyUnique);
// separar basado en nombre
for (j = 0; j < uniqueWorkNumbers.length; j++) {
  pathCoords = connectTheDots(ItinerarioLayer, j);
  var pathLine = L.polyline(pathCoords).addTo(mymap)
}
