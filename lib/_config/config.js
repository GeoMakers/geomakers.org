Config = {
  pageSize: 10,
  editorsPicksToDisplay: 3, // Must be > 0 (or all editor's picks will be squeezed into the first page)
  mapbox: {
    accessToken: 'pk.eyJ1IjoiZ2VvbWFrZXJzIiwiYSI6InFIaHRZTmMifQ.ERh8NkXAzKXonjP8s2TarQ',
    mapId: 'geomakers.l2i93ia9'
  },

  // Read AWS config from orion. Orion ensures these are only available on the server.
  aws: {
    accessKeyId: orion.config.get('AWS_API_KEY'),
    secretAccessKey: orion.config.get('AWS_API_SECRET'),
    bucket: orion.config.get('AWS_S3_BUCKET') || 'geomakers.org-user-files'
  }
};
