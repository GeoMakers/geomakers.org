var itemsCount = 0;
var initialItemsLimit = 5;

Template.userContent.created = function() {
  this.showAll = new ReactiveVar(false);
  this.itemsCount = Template.currentData().items.count();
}

Template.userContent.helpers({
  getItems: function(cursor) {
    cursor.limit = Template.instance().showAll.get() ? 0 : initialItemsLimit;
    return cursor.fetch();
  },
  hasItems : function() {
    return Template.instance().itemsCount > 0;
  },
  hasMoreItems: function() {
    return !Template.instance().showAll.get() && Template.instance().itemsCount > initialItemsLimit;
  }
});

Template.userContent.events({
  'click .show-all': function(e, template) {
    template.showAll.set(true);
  }
});
