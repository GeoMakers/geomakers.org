Meteor.startup(function() {
  Avatar.options = {
    gravatarDefault: "mm"
  };
});

Template.appBody.helpers({
  routeName: function() {
    return Router.current().route.getName();
  }
})

Template.aside.rendered = function() {
  var $affix = this.$('.aside-content');

  // Wait for ad image to be loaded
  this.$('.ad img').load(function() {
    // Affix aside content
    $affix.affix({
      offset: {
        top: function() {
          return (this.top = $affix.offset().top - 20); // 20 should change if @line-height-computed changes
        },
        bottom: function () {
          return (this.bottom = $('footer').outerHeight(true));
        }
      }
    });
  });
}

// Orion overrides
Template.adminLayout.onRendered(function() {
  // Inject navbar in admin layou for easier navigation back to frontend
  Blaze.render(Template.navbar, this.firstNode, this.find('.orion-admin-panel'));
});
