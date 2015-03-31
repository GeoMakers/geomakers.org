Template.activities.helpers({
  empty: function() {
    return this.activities.count() == 0;
  },
  getQuery: function() {
    var query = {};
    var recipe = Template.parentData().recipe;
    if (recipe) query.recipe = recipe._id;
    return query;
  }
});
