Meteor.startup(function() {
  var addthisScript = document.createElement('script');
  addthisScript.setAttribute('src', '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-54d3ca19104c6030');
  document.body.appendChild(addthisScript);
});

Template.sharing.rendered = function() {
  if (addthis && addthis.layers.refresh) {
    addthis.layers.refresh();
  }
};
