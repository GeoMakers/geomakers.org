var getAuthor = function() {
  return Meteor.users.findOne(this.createdBy);
};

Template.dreamsList.helpers({
  author: getAuthor,
  image: function() {
    if (this.imageIds && this.imageIds.length > 0) {
      return Images.findOne({_id: this.imageIds[0]});
    }
  },
  moreResults: function() {
    return this.dreams.limit < this.dreams.collection.find().count();
  },
  nextLimit: function() {
    return this.dreams.limit + Config.pageSize;
  }
});

Template.dream.helpers({
  currentUserIsAuthor: function() {
    return this.createdBy === Meteor.userId();
  },
  imagesOrVideos: function() {
    return this.imageIds || this.videos;
  },
  images: function() {
    if (this.imageIds) {
      return Images.find({_id: {$in: this.imageIds}});
    }
  }
});

Template.dreamHeader.helpers({
  author: getAuthor
});
