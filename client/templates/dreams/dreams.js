var getAuthor = function() {
  return Meteor.users.findOne(this.createdBy);
};

Template.dreams.helpers({
  author: getAuthor
});

Template.dream.helpers({
  author: getAuthor
});
