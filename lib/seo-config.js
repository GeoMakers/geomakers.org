Meteor.startup(function() {
  if (Meteor.isClient) {
    // Configure meta ignore list for SEO package (otherwise some of our meta elements from head.html will be removed)
    SEO.config({
      ignore: _.extend(SEO.settings.ignore, {
        meta: _.union(SEO.settings.ignore.meta, ['msapplication-TileColor', 'msapplication-TileImage', 'viewport']),
        link: _.union(SEO.settings.ignore.link, ['shortcut icon', 'apple-touch-icon-precomposed'])
      })
    });
  }
});
