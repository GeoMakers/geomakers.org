Template.gallery.helpers({
  index: function() {
    return Template.parentData().indexOf(this) + 1;
  },
  hasMultipleImages: function() {
    return this.length > 1;
  }
});

Template.gallery.rendered = function() {
  var $gallery = this.$(this.firstNode);

  // Set up observation, so gallery will be automatically reinitialized if images change
  this.autorun(function() {
    // Establish dependency on gallery images
    var images = Template.currentData();

    // Un-slick sliders if they have already been slicked
    if ($gallery.find('.selected-image')[0] && $gallery.find('.selected-image')[0].slick) $gallery.find('.selected-image').slick('unslick');
    if ($gallery.find('.thumbnails')[0] && $gallery.find('.thumbnails')[0].slick) $gallery.find('.thumbnails').slick('unslick');

    // Schedule slider initialization after DOM has been updated
    Tracker.afterFlush(function() {
      $gallery.find('.selected-image').slick({
       slidesToShow: 1,
       slidesToScroll: 1,
       arrows: false,
       adaptiveHeight: true,
       asNavFor: '.thumbnails'
      });
      $gallery.find('.thumbnails').slick({
       slidesToShow: 5,
       slidesToScroll: 1,
       arrows: false,
       centerMode: true,
       focusOnSelect: true,
       dots: true,
       asNavFor: '.selected-image'
      });
    });
  });
};
