Meteor.startup(function(){
  Mapbox.load('locate', 'fullscreen');
});

Template.activity.rendered = function () {
  var map, marker;
  this.autorun(function () {
    if (Mapbox.loaded() && Template.currentData().location) {
      L.mapbox.accessToken = Config.mapbox.accessToken;
      if (!map) {
        map = L.mapbox.map('map', Config.mapbox.mapId, {
          tileLayer: false, // Disable built-in Mapbox tile layer (we load tiles from CartoDB)
          featureLayer: false, // Disable built-in Mapbox feature layer (we will add features later)
          maxZoom: 18,
          center: [Template.currentData().location.lat, Template.currentData().location.lng],
          zoom: 12,
          scrollWheelZoom: false
        });

        // Add fullscreen control
        L.control.fullscreen({position: 'bottomleft'}).addTo(map);

        L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{retina}.png', {
          retina: window.devicePixelRatio > 1 ? '@2x' : '',
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        }).addTo(map);
      }
      else {
        map.setView([Template.currentData().location.lat, Template.currentData().location.lng]);
      }

      if (!marker) {
        marker = L.marker(Template.currentData().location, {
          icon: L.mapbox.marker.icon({
            'marker-size': 'medium',
            'marker-color': '#0ad78c'
          })
        })
        .bindPopup(Template.currentData().title)
        .addTo(map);
      }
      else {
        marker.setLatLng(Template.currentData().location);
      }
    }
  });
};
