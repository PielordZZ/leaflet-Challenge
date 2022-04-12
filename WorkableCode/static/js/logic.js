
var myMap = L.map("map", {
    center: [32, -12],
    zoom: 3
  });

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";




// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function circleSize(mag){
  return mag**5 *100
};
function colorCircle(depth){
  var color= `rgb(${parseInt((depth/50)**0.5*255)},${parseInt(((depth-50)/50)**2*255)},${40})`;
  return color
};

d3.json(url).then(function(data){

    console.log(data)
  var i =0;
    for (i = 0; i<data.features.length; i++) {
        var location = data.features[i].geometry.coordinates;
        var mag = data.features[i].properties.mag;

        if (location) {
          L.circle([location[1], location[0]], {
            color: colorCircle(location[2]),
            fillColor: colorCircle(location[2]),
            fillOpacity: 0.5,
            radius: circleSize(mag)
          }).bindTooltip(`<h3>${data.features[i].properties.title}</h3><h4>Epicenter at a depth of ${location[2]}</h4>`).addTo(myMap);
        }
      } 
});