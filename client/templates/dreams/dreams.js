Template.dreams.helpers({
  author: function() {
    return Meteor.users.findOne(this.createdBy);
  }
});
