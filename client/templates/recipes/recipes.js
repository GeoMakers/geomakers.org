Template.recipe.helpers({
  files: function() {
    if (this.fileIds) {
      return Attachments.find({_id: {$in: this.fileIds}});
    }
  }
});

Template.recipes.helpers({
  empty: function() {
    return this.recipes.count() == 0;
  }
});

Template.recipesBoard.helpers({
  getQuery: function() {
    var query = {};
    var dream = Template.parentData().dream;
    if (dream) query.dream = dream._id;
    return query;
  }
});

Template.recipesBoard.onRendered(function() {
  var boardNode = this.firstNode;
  var masonry = new Masonry(boardNode, {
    itemSelector: '.recipe'
  });

  this.autorun(function() {
    // Set up a dependency on all content of the board (so a new masonry layout is created both when items are added or removed as well as changed)
    Template.currentData().recipes.fetch();

    // Schedule creation of a new board layout after flush (DOM updated)
    Tracker.afterFlush(function() {
      // Wait for images to load
      imagesLoaded(boardNode, function() {
        masonry = new Masonry(boardNode, masonry.options);
      });
    });
  });
});
