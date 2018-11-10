var mymap = L.map('mapid').setView([19.392784, -99.144683], 12);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoib21hci1uYXZhcnJvIiwiYSI6ImNpanN2ZWZxZzBoa291eWx4ZWdsajl1OGIifQ.SH4OG9811nirTGJ3rE4DHw'
}).addTo(mymap);

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

// {
//   radius: 8,
//   fillOpacity: 1,
//   color: 'black',
//   fillColor: getColor(feature.properties.stype),
//   weight: 1,
// }

// dibujar al mapa
ItinerarioLayer.addTo(mymap);
var featureLayers = {
  "Itinerario": ItinerarioLayer
};
var geojson = L.control.layers(featureLayers, null, {
  collapsed: false
}).addTo(mymap);