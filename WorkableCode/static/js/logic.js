
var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 3
  });

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";




// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function circleSize(mag){
  return mag**5 *10000
};
function colorCircle(mag){
  var color= 'green';
  if(mag>6){
    color = 'red';
  }
  else if(mag>3.5){
    color='yellow'
  }
  else {
    color = 'green';
  };
  return color
};

d3.json(url).then(url, function(data){
    console.log(data)
    for (var i = 0; i < response.length.features; i++) {
        var location = data.features[i].geometry.coordinates;
        console.log(location)
        var magnitude = data[i].properties.mag
        if (location) {
          L.circle([location.coordinates[1], location.coordinates[0]], {
            color: colorCircle(mag),
            fillColor: colorCircle(mag),
            fillOpacity: 0.5,
            radius: circleSize(mag)
          }).addTo(myMap);
        }
      } 
});