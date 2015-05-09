function totalCount(contentTypes) {
  return contentTypes.map(function(contentType) {
    return contentType.cursor.count();
  }).reduce(function(previousValue, currentValue) {
    return previousValue + currentValue;
  });
}

Template.userStats.helpers({
  contentTypes: function() {
    return [{
        cursor: this.dreams,
        userTitle: 'GeoDreamer'
      }, {
        cursor: this.recipes,
        userTitle: 'GeoMaker'
      }, {
        cursor: this.activities,
        userTitle: 'GeoBooster'
      }
    ];
  },
  hasContent: function() {
    return totalCount(this) > 0;
  },
  percentageOf: function(contentTypes) {
    return Math.round(this.cursor.count() / totalCount(contentTypes) * 100);
  }
});

Template.userStats.onRendered(function() {
  this.$('span', this.firstNode).tooltip();
});

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
