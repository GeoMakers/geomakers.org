var embeds = new ReactiveDict();

function slideCount(data) {
  return (data.imageIds ? data.imageIds.length : 0) + (data.videos ? data.videos.length : 0);
};

Template.gallery.helpers({
  hasMultiple: function() {
    return slideCount(this) > 1;
  },
  embed: function() {
    if (!embeds.get(this)) {
      var url = this;
      HTTP.get('http://noembed.com/embed?nowrap=on&url=' + encodeURIComponent(url), function(error, result) {
        if (!error && result.data) {
          embeds.set(url, result.data);
        }
      });
    }
    return embeds.get(this);
  }
});

Template.gallery.rendered = function() {
  var $gallery = this.$(this.firstNode);

  // Set up observation, so gallery will be automatically reinitialized if images change
  this.autorun(function() {
    // Establish dependency on gallery data
    var data = Template.currentData();

    // Un-slick sliders if they have already been slicked
    if ($gallery.find('.selected-image')[0] && $gallery.find('.selected-image')[0].slick) $gallery.find('.selected-image').slick('unslick');
    if ($gallery.find('.thumbnails')[0] && $gallery.find('.thumbnails')[0].slick) $gallery.find('.thumbnails').slick('unslick');

    // Schedule slider initialization after DOM has been updated
    Tracker.afterFlush(function() {
      $gallery.find('.selected-image').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        asNavFor: '.thumbnails'
      });
      var thumbnailsToShow = 5;
      $gallery.find('.thumbnails').slick({
        slidesToShow: thumbnailsToShow,
        slidesToScroll: 1,
        infinite: false,
        centerMode: slideCount(data) > thumbnailsToShow,
        focusOnSelect: true,
        swipeToSlide: true,
        asNavFor: '.selected-image'
      });
    });
  });
};
