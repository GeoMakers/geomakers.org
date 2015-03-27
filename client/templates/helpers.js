Template.registerHelper('preview', function(value, options) {
  if (!value) return;
  var length = options.hash.length || 140;
  var content = value.replace(/<(?:.|\n)*?>/gm, ' ');
  if(content.length > length) content = content.substring(0, length-1).trim() + '…';
  return content;
});

Template.registerHelper('linkify', function(value){
  if (!value) return;
  var urlRegExp = /(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?/ig;
  return value.replace(urlRegExp, '<a href="$&" target="_blank">$&</a>');
});

Template.registerHelper('date', function(date) {
  return moment(date).format('lll');
});

Template.registerHelper('author', function() {
  return Meteor.users.findOne(this.createdBy);
});

Template.registerHelper('image', function() {
  if (this.imageIds && this.imageIds.length > 0) {
    return Images.findOne({_id: this.imageIds[0]});
  }
});

Template.registerHelper('images', function() {
  if (this.imageIds) {
    return Images.find({_id: {$in: this.imageIds}});
  }
});

Template.registerHelper('currentUserIsAuthor', function() {
  return this.createdBy === Meteor.userId();
});

Template.registerHelper('imagesOrVideos', function() {
  return this.imageIds || this.videos;
});
