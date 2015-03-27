var imagesOriginalsStore = new FS.Store.S3("originals",
  _.extend({
    folder: 'images/originals'
  }, Config.aws)
);

var imagesThumbnailsStore = new FS.Store.S3("thumbnails",
  _.extend({
    folder: 'images/thumbnails',
    transformWrite: function(fileObj, readStream, writeStream) {
      gm(readStream, fileObj.name()).resize(null, 100).stream().pipe(writeStream);
    }
  }, Config.aws)
);

var imagesThumbnailsLargeStore = new FS.Store.S3("thumbnails-large",
  _.extend({
    folder: 'images/thumbnails-large',
    transformWrite: function(fileObj, readStream, writeStream) {
      gm(readStream, fileObj.name()).resize(null, 400).stream().pipe(writeStream);
    }
  }, Config.aws)
);

Images = new FS.Collection("images", {
  stores: [imagesOriginalsStore, imagesThumbnailsStore, imagesThumbnailsLargeStore],
  filter: {
    maxSize: 5242880,
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
