Meteor.startup(function(){
  Mapbox.load('locate');
});

Template.makerspaces.rendered = function () {
  this.autorun(function () {
    if (Mapbox.loaded()) {
      L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VvbWFrZXJzIiwiYSI6InFIaHRZTmMifQ.ERh8NkXAzKXonjP8s2TarQ';
      var map = L.mapbox.map('map', 'geomakers.l2i93ia9', {
        featureLayer: false, // Disable built-in Mapbox feature layer (we load features our own GeoJSON)
        maxZoom: 18,
        center: [37.35, -96.88],
        zoom: 4
      })
        .addControl(L.control.locate())
        .addControl(L.mapbox.geocoderControl('mapbox.places', {
          autocomplete: true
        }));

      var featureLayer = L.mapbox.featureLayer()
        .loadURL('/data/makerspaces.geojson')
        .on('ready', function() {
          featureLayer.eachLayer(function(layer) {
            var content =
              '<h2>' + layer.feature.properties.name + '</h2>' +
              '<address>' + layer.feature.properties.address + '</address>' +
              '<a href="' + layer.feature.properties.url + '" target="_blank">' + layer.feature.properties.url + '</a>';
            layer.bindPopup(content);
          });
        })
        .addTo(map);
    }
  });
};
