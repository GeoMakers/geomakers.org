Meteor.startup(function() {
  Avatar.options = {
    gravatarDefault: "mm"
  };
});

Template.appBody.events({
  'click .sign-out-button': AccountsTemplates.logout
})
