Template.registerHelper('preview', function(value, options) {
  if (!value) return;
  var length = options.hash.length || 140;

  // Strip HTML tags
  var content = value.replace(/<(?:.|\n)*?>/gm, '');

  // Convert &nbsp; HTML entity to a clean text space
  content = content.replace(/&nbsp;/gm, ' ');

  // Unescape HTML encoded characters (such as ampersand)
  content = _.unescape(content);
  
  if(content.length > length) content = content.substring(0, length-1).trim() + '…';
  return content;
});

Template.registerHelper('linkify', function(value){
  if (!value) return;
  var urlRegExp = /(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?/ig;
  return value.replace(urlRegExp, '<a href="$&" target="_blank">$&</a>');
});

Template.registerHelper('sanitizeHtml', function(value){
  return Spacebars.SafeString(UniHTML.purify(value, {customTags: {div: true}}));
});

Template.registerHelper('formatDateTime', function(dateTime) {
  return moment(dateTime).format('lll');
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

Template.registerHelper('mergePicks', function(items, pickedItems){
  var mergedItems = items.fetch();
  var pickedItemsCount = pickedItems ? pickedItems.count() : 0;
  if (pickedItemsCount > 0) {

    // Index where the first picked item will be inserted
    var itemInsertionIndex = 1;

    // Iterate over picked items
    pickedItems.forEach(function(pickedItem) {

      // Remove picked item from its original place in the complete list
      mergedItems = _.reject(mergedItems, function(item) {
        return item._id === pickedItem._id;
      });

      // Insert picked item at insertion index
      mergedItems.splice(itemInsertionIndex, 0, pickedItem);

      // Make sure that all picked items are evenly spaced within the first page, offset by the original insertion index
      itemInsertionIndex += (Config.pageSize + pickedItemsCount) / pickedItemsCount;
    });
  }
  return mergedItems;
});

Template.registerHelper('moreResults', function() {
  return this.limit < this.collection.find(this.matcher._selector).count();
});

Template.registerHelper('nextLimit', function(cursor) {
  return this.limit + Config.pageSize;
});
