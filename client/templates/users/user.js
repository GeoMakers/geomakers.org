var dreamsCount = 0;
var initialDreamsLimit = 5;

Template.userAside.created = function() {
  dreamsCount = Template.currentData().dreams.count();
}

Template.userAside.helpers({
  getDreams: function() {
    this.dreams.limit = Iron.controller().state.get('showAllDreams') ? 0 : initialDreamsLimit;
    return this.dreams.fetch();
  },
  hasMoreDreams: function() {
    var controller = Iron.controller();
    return !Iron.controller().state.get('showAllDreams') && dreamsCount > initialDreamsLimit;
  }
});

Template.userAside.events({
  'click .dreams .show-all': function() {
    Iron.controller().state.set('showAllDreams', true);
  }
});
