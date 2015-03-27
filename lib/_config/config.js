Config = {
  pageSize: 10,

  // Read AWS config from orion. Orion ensures these are only available on the server.
  aws: {
    accessKeyId: orion.config.get('AWS_API_KEY'),
    secretAccessKey: orion.config.get('AWS_API_SECRET'),
    bucket: orion.config.get('AWS_S3_BUCKET') || 'geomakers.org-user-files'
  }
};
