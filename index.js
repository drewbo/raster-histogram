'use strict';
var map = L.map('map',{attributionControl: false, zoomControl: false});
var token = 'pk.eyJ1IjoiZHJld2JvMTkiLCJhIjoiWlpRb2lYUSJ9.aT3CQyI2_wYzqKPDqjgvyw';
var id = 'drewbo19.mbqbmx6r';
L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}', {id: 'mapbox.satellite', token: token}).addTo(map);
map.setView([38.891812818740036,-120.1188883186167], 8);

var width = d3.select('#hist').style('width').slice(0,-2),
    height = 250,
    data   = [],
    tempData = [],
    x = d3.scale.linear().range([0, width]),
    y = d3.scale.linear().range([0, height]),

    rgb = d3.scale.ordinal().domain(d3.range(3)).range(["red", "green", "blue"]),
    xH = d3.scale.linear().domain([0, 255]).range([0, width]),
    yH = d3.scale.linear().range([0, height - 5]);

var svg, canvas, histo;

var empty = Array(256);
for (var i = 0; i < 256; i++) { empty[i] = 0; }

function histogram(imgData) {
        var d = d3.range(3).map(function() {
          return empty.slice();
        });

    i = 0;
    do {
      d[0][imgData[i++]]++;
      d[1][imgData[i++]]++;
      d[2][imgData[i++]]++;
      i++; // alpha
    } while(i < imgData.length)
    d[0][0] = 0
    d[1][0] = 0
    d[2][0] = 0

    var max = Math.max(d3.max(d[0]), d3.max(d[1]), d3.max(d[2]));
    yH.domain([0, max]);

    return d;
  }

var area = d3.svg.area()
    .x(function(d, i) { return xH(i); })
    .y0(height)
    .y1(function(d) { return height - yH(d); })
    .interpolate("basis");

svg = d3.select("#hist")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")

var data = []

map.on('moveend', function(e){
  d3.selectAll('canvas').remove();
  svg.selectAll(".histo").remove();
  var canvas = d3.select("#img")
    .append("canvas")
    .attr("width", 256)
    .attr("height", 256)
    .each(function() {
        var canvasRef = this,
            toLoad = d3.selectAll('.leaflet-tile-loaded')[0].length,
            counter = 0,
            p;
      d3.selectAll('.leaflet-tile-loaded').each(function(){
        var image = new Image();
        image.crossOrigin = "anonymous";
        image.src = 'http://earthexplorer.usgs.gov/browse/landsat_8/2015/141/041/LC81410412015088LGN00.jpg' //d3.select(this).attr('src');
        var context = canvasRef.getContext('2d');
        image.onload = function(){
          counter++;
          context.clearRect(0, 0, canvasRef.width, canvasRef.height)
          context.drawImage(image, 0, 0);
          p = context.getImageData(0, 0, 256, 256).data;
          tempData.push(p);
          if (counter === toLoad) {
            context.clearRect(0, 0, canvasRef.width, canvasRef.height)
            data = histogram(p)
						console.log(data)
						var histo = svg.selectAll(".histo")
							.data(data).enter()
							.append("path")
							.attr("class", "histo")
							.attr("fill", function(d, i) { return rgb(i); })
							.attr("stroke", function(d, i) { return rgb(i); })
							.attr('d', area)
            //histo.data(data).attr("d", area);
						console.log(histo)
          }
        }
      });
    });
});
