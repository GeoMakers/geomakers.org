Meteor.startup(function(){
  Mapbox.load('locate', 'fullscreen');
});

Template.makerspaces.rendered = function () {
  this.autorun(function () {
    if (Mapbox.loaded()) {
      L.mapbox.accessToken = Config.mapbox.accessToken;
      var map = L.mapbox.map('map', Config.mapbox.mapId, {
        tileLayer: false, // Disable built-in Mapbox tile layer (we load tiles from CartoDB)
        featureLayer: false, // Disable built-in Mapbox feature layer (we load features our own GeoJSON)
        maxZoom: 18,
        center: [37.35, -96.88],
        zoom: 4
      });

      // Add locate control and request location
      var locateControl = L.control.locate({
        setView: false // Don't set view when location is found. We have a custom handler for that.
      }).addTo(map);

      // Add geocoder control
      var geocoderControl = L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true
      }).addTo(map);

      // Add fullscreen control
      L.control.fullscreen({position: 'bottomleft'}).addTo(map);

      L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{retina}.png', {
        retina: window.devicePixelRatio > 1 ? '@2x' : '',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      }).addTo(map);

      // Load map markers from GeoJSON
      $.getJSON('/data/makerspaces.geojson', function(data) {
        var geoJsonLayer = L.geoJson(data, {
          pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
              icon: L.mapbox.marker.icon({
                'marker-color': '#f05a28'
              })
            });
          },
          onEachFeature: function (feature, layer) {
            var content =
              '<h2>' + layer.feature.properties.name + '</h2>' +
              '<address>' + layer.feature.properties.address + '</address>' +
              '<a href="' + layer.feature.properties.url + '" target="_blank">' + layer.feature.properties.url + '</a>';
            layer.bindPopup(content);
          }
        }).addTo(map);

        // Location found event handler
        map.on('locationfound', function(locationEvent) {
          findNearest(locationEvent.latlng);
        });

        // Geocoder search result selected event handler
        var geocoderResultMarker;
        geocoderControl.on('select', function(selectEvent) {
          var feature = selectEvent.feature;
          var latLng = L.latLng(feature.center[1], feature.center[0]);

          // Set marker for search result (reuse if a marker already exists)
          if (geocoderResultMarker) {
            geocoderResultMarker
              .setLatLng(latLng)
              .setPopupContent(feature.place_name)
          }
          else {
            geocoderResultMarker = L.marker(latLng, {
              icon: L.mapbox.marker.icon({
                'marker-color': '#2A93EE'
              })
            }).bindPopup(feature.place_name)
              .addTo(map);
          }

          findNearest(latLng);
        });

        // Find nearest point in GeoJSON layer, fit map bounds, and open popup
        function findNearest(latLng) {
          var nearest = leafletKnn(geoJsonLayer).nearest(latLng, 1);
          if (nearest.length > 0) {
            var nearestMarker = nearest[0].layer;
            nearestMarker.openPopup();
            map.fitBounds([latLng, nearestMarker.getLatLng()]);
          }
        }
      });
    }
  });
};
