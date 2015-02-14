Template.gallery.helpers({
  index: function() {
    return Template.parentData().indexOf(this) + 1;
  }
});

Template.gallery.rendered = function() {
  var $gallery = this.$(this.firstNode);

  // Set up observation, so gallery will be automatically reinitialized if images change
  this.autorun(function() {
    // Establish dependency on gallery images
    Template.currentData();

    // Schedule gallery initialization after DOM has been updated
    Tracker.afterFlush(function() {
      $gallery.justifiedGallery({
        captions: false
      });
    });
  });
};
