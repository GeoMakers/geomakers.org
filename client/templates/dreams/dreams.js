var getAuthor = function() {
  return Meteor.users.findOne(this.createdBy);
};

Template.dreamsList.helpers({
  author: getAuthor
});

Template.dream.helpers({
  author: getAuthor
});
