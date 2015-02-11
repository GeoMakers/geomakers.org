Meteor.methods({
  tags: function(query) {
    // FIXME This may need optimization later on. Performance has not been tested.
    var regExp = new RegExp(query, 'i');
    return orion.entities.dreams.collection.distinct('tags', regExp).filter(function(tag) {
      return regExp.test(tag);
    });
  }
});
