Template.recipesBoard.rendered = function() {
  var masonry = new Masonry(this.firstNode, {
    itemSelector: '.recipe'
  });
  imagesLoaded(this.firstNode, function() {
    masonry.layout();
  });
};
