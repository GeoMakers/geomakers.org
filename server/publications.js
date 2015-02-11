// Publish certain fields publicly for all users (needed for linking to user profiles etc.)
Meteor.publish('publicUsers', function() {
  return Meteor.users.find({}, {fields: {'profile.name': 1}});
});
