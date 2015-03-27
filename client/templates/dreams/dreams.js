Template.dreamsList.helpers({
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
