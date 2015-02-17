Template.gallery.rendered = function() {
  var $gallery = this.$(this.firstNode);

  // Set up observation, so gallery will be automatically reinitialized if images change
  this.autorun(function() {
    // Establish dependency on gallery images
    var images = Template.currentData();

    // Schedule gallery initialization after DOM has been updated
    Tracker.afterFlush(function() {
      if (images.count() > 1) {
        $gallery.justifiedGallery({
          captions: false,
          rowHeight: 100
        });
      }
    });
  });
};
