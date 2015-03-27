Template.recipe.helpers({
  files: function() {
    if (this.fileIds) {
      return Attachments.find({_id: {$in: this.fileIds}});
    }
  }
});

Template.recipesBoard.onRendered(function() {
  var boardNode = this.firstNode;

  this.autorun(function() {
    // Set up a dependency on all content of the board (so a new masonry layout is created both when items are added or removed as well as changed)
    Template.currentData().recipes.fetch();

    // Schedule creation of a new board layout after flush (DOM updated)
    Tracker.afterFlush(function() {
      // Wait for images to load
      imagesLoaded(boardNode, function() {
        // Create new masonry (even if one exists, calling layout is not enough as new items may have been added or removed)
        var masonry = new Masonry(boardNode, {
          itemSelector: '.recipe'
        });
      });
    });
  });
});
