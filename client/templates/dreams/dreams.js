Template.dreams.helpers({
  creator: function() {
    return Meteor.users.findOne(this.createdBy);
  }
});
