var getAuthor = function() {
  return Meteor.users.findOne(this.createdBy);
};

Template.dreamsList.helpers({
  author: getAuthor,
  image: function() {
    if (this.imageIds && this.imageIds.length > 0) {
      return Images.findOne({_id: this.imageIds[0]});
    }
  }
});

Template.dream.helpers({
  author: getAuthor,
  images: function() {
    if (this.imageIds) {
      return Images.find({_id: {$in: this.imageIds}});
    }
  }
});
