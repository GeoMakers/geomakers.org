// Read AWS config from orion. Orion ensures these are only available on the server.
var awsConfig = {
  accessKeyId: orion.config.get('AWS_API_KEY'),
  secretAccessKey: orion.config.get('AWS_API_SECRET'),
  bucket: orion.config.get('AWS_S3_BUCKET') || 'geomakers.org-user-files'
};

var imagesOriginalsStore = new FS.Store.S3("originals",
  _.extend({
    folder: 'images/originals'
  }, awsConfig)
);

var imagesThumbnailsStore = new FS.Store.S3("thumbnails",
  _.extend({
    folder: 'images/thumbnails',
    transformWrite: function(fileObj, readStream, writeStream) {
      gm(readStream, fileObj.name()).resize(null, 100).stream().pipe(writeStream);
    }
  }, awsConfig)
);

Images = new FS.Collection("images", {
  stores: [imagesOriginalsStore, imagesThumbnailsStore],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

Images.allow({
  download: function() {
    return true; // All images are public
  },
  insert: function() {
    return true; // All users can upload new images
  },
  update: function(userId, doc) {
    // TODO Only the owner of the image should be allowed to update. Unfortunately, meteor-autoform-file does not currently let us add the owner metadata easily when uploading the file
    return true;
  }
});
