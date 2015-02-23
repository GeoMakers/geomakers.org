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

Template.appBody.events({
  'click .sign-out-button': AccountsTemplates.logout
})

Template.appBody.rendered = function() {
  SVGInjector(this.$('img[src$=".svg"]'));
};
