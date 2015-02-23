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

Template.appBody.rendered = function() {
  SVGInjector(this.$('img[src$=".svg"]'));
};
