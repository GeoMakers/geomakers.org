var getAuthor = function() {
  return Meteor.users.findOne(this.createdBy);
};

Template.dreamsList.helpers({
  author: getAuthor,
  image: function() {
    if (this.images && this.images.length > 0) {
      return this.images[0];
    }
  }
});

Template.dream.helpers({
  currentUserIsAuthor: function() {
    return this.createdBy === Meteor.userId();
  },
  imagesOrVideos: function() {
    return this.images || this.videos;
  }
});

Template.dreamHeader.helpers({
  author: getAuthor
});
