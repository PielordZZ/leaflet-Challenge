//default map location and zoom
var myMap = L.map("map", {
  center: [32, -12],
  zoom: 3
});

// url for earthquake data
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";




// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
// function to create a circle radius proportional to absolute magnitude
function circleSize(mag) {
  return mag ** 5 * 100
};

//creates a color where red is highest and green is lowest values with a cap to color gradient at 50
function colorCircle(depth) {
  var color = `rgb(${parseInt((depth / 50) ** 0.5 * 255)},${parseInt(((depth - 50) / 50) ** 2 * 255)},${40})`;
  return color
};

//get the data from the specified site
d3.json(url).then(function (data) {
  //debug line to display data
  //console.log(data)

  // loop through each feature (earthquake)
  var i = 0;
  for (i = 0; i < data.features.length; i++) {

    //get the coordinates and magnitude of the feture
    var location = data.features[i].geometry.coordinates;
    var mag = data.features[i].properties.mag;
    //if there is a location make a circle

    if (location) {
      L.circle([location[1], location[0]], {
        //circle given properties consistent with feature properties
        color: colorCircle(location[2]),
        fillColor: colorCircle(location[2]),
        fillOpacity: 0.5,
        radius: circleSize(mag)
        //add data about the event in a tooltip (popup without required clicking)
      }).bindTooltip(`<h3>${data.features[i].properties.title}</h3><h4>Epicenter at a depth of ${location[2]}</h4>`).addTo(myMap);
    }
  }
});