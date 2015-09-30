'use strict';

var d3 = require('d3');
var flatten = require('lodash.flatten');
var cover = require('tile-cover');
var bbox = require('turf-bbox-polygon');

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

    rgb = d3.scale.ordinal().domain(d3.range(3)).range(['red', 'green', 'blue']),
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
    //yH.domain([0, 1000])
    return d;
  }

var area = d3.svg.area()
    .x(function(d, i) { return xH(i); })
    .y0(height)
    .y1(function(d) { return height - yH(d); })
    .interpolate('basis');

svg = d3.select('#hist')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
    .append('g')

var limits = {
  max_zoom: 9,
  min_zoom: 6
};
var tileDisplay = L.layerGroup().addTo(map);

map.on('moveend', function(e){
  d3.selectAll('canvas').remove();
  svg.selectAll('.histo').remove();
  tileDisplay.clearLayers()

  var geo = bbox(map.getBounds().toBBoxString().split(',')).geometry;
  var tiles = cover.tiles(geo, limits);
  var tileGeo = cover.geojson(geo, limits);

  L.geoJson(tileGeo, {
    weight: 2,
    fillOpacity: 0
  }).addTo(tileDisplay);

  var urlPartOne = 'http://api.tiles.mapbox.com/v4/mapbox.satellite/';
  var urlPartTwo = '.png?access_token=pk.eyJ1IjoiZHJld2JvMTkiLCJhIjoiWlpRb2lYUSJ9.aT3CQyI2_wYzqKPDqjgvyw';

  var toLoad = tiles.length,
      counter = 0;

  var mapZoom = map.getZoom();

  tiles.forEach(function(tile, index){
    var image = new Image();
    image.crossOrigin = 'anonymous';
    var loc = tile.slice(0);
    loc.unshift(loc.pop());
    image.src = urlPartOne + loc.join('/') + urlPartTwo;

    // adjust dimensions according to relative zoom
    var dim =  256 / (tile[2] - mapZoom + 1);

    image.width = image.height = dim;

    image.onload = function(){
      counter++;

      var canvas = document.createElement('canvas');
      canvas.width = canvas.height = dim;

      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      var imageData = context.getImageData(0, 0, dim, dim);
      var p = imageData.data;
      tempData.push(Array.from(p));
      if (counter === toLoad) {

        console.log(flatten(tempData));
        data = histogram(flatten(tempData))

				var histo = svg.selectAll('.histo')
					.data(data).enter()
					.append('path')
					.attr('class', 'histo')
					.attr('fill', function(d, i) { return rgb(i); })
					.attr('stroke', function(d, i) { return rgb(i); })
					.attr('d', area)
        //histo.data(data).attr('d', area);

      }
    }
  });
});
