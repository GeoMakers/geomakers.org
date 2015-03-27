Template.dreamsList.helpers({
  moreResults: function() {
    return this.dreams.limit < this.dreams.collection.find().count();
  },
  nextLimit: function() {
    return this.dreams.limit + Config.pageSize;
  }
});
