Template.feed.helpers({
  staticMapUrl: function() {
    return s.sprintf('//api.tiles.mapbox.com/v4/%(mapId)s/pin-m+0ad78c(%(lng)s,%(lat)s)/%(lng)s,%(lat)s,12/356x200%(retina)s.png?access_token=%(accessToken)s', {
      mapId: Config.mapbox.mapId,
      accessToken: Config.mapbox.accessToken,
      lat: this.location.lat,
      lng: this.location.lng,
      retina: window.devicePixelRatio > 1 ? '@2x' : ''
    });
  }
});
