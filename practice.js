function connectTheDots(data) {
  var c = [];
  let allWorkNumbers = [];
  // store all work numbers into array
  for (i in data._layers) {
    let workNumber = data._layers[i].feature.properties.ID_ITINERA
    allWorkNumbers.push(workNumber);
  }
  let uniqueWorkNumbers = allWorkNumbers.filter(onlyUnique);
  console.log(uniqueWorkNumbers)
  for (i in data._layers) {
    if (data._layers[i].feature.properties.ID_ITINERA === 1) {
      var x = data._layers[i]._latlng.lat;
      var y = data._layers[i]._latlng.lng;
      c.push([x, y]);
    }
  }
  return c;
}