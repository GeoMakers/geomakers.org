var attachmentsStore = new FS.Store.S3("attachments", Config.aws);

Attachments = new FS.Collection("attachments", {
  stores: [attachmentsStore],
  filter: {
    maxSize: 52428800
  }
});

Attachments.allow({
  download: function() {
    return true; // All files are public
  },
  insert: function() {
    return true; // All users can upload new files
  },
  update: function(userId, doc) {
    // TODO Only the owner of the file should be allowed to update. Unfortunately, meteor-autoform-file does not currently let us add the owner metadata easily when uploading the file
    return true;
  }
});
