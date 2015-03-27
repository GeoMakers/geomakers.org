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

Template.registerHelper('fileIcon', function() {
  var icon = 'file-o';
  if (this && this.original.type) {
    var type = this.original.type;
    if (type.indexOf('pdf') > -1) {
      icon = 'file-pdf-o';
    } else if (type.indexOf('msword') > -1 || type.indexOf('officedocument.wordprocessingml.document') > -1) {
      icon = 'file-word-o';
    } else if (type.indexOf('mspowerpoint') > -1 || type.indexOf('officedocument.presentationml.presentation') > -1) {
      icon = 'file-powerpoint-o';
    } else if (type.indexOf('ms-excel') > -1 || type.indexOf('officedocument.spreadsheetml.sheet') > -1) {
      icon = 'file-excel-o';
    } else if (type.indexOf('zip') > -1) {
      icon = 'file-archive-o';
    } else if (this.isImage()) {
      icon = 'file-image-o';
    } else if (this.isVideo()) {
      icon = 'file-movie-o';
    } else if (this.isAudio()) {
      icon = 'file-audio-o';
    }
  }
  return icon;
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
