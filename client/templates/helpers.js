Template.registerHelper('preview', function(value, options) {
  if (!value) return;
  var length = options.hash.length || 140;
  var content = value.replace(/<(?:.|\n)*?>/gm, ' ');
  if(content.length > length) content = content.substring(0, length-1).trim() + '…';
  return content;
});

Template.registerHelper('date', function(date) {
  return moment(date).format('lll');
});
