// Publish certain fields publicly for all users (needed for linking to user profiles etc.)
Meteor.publish('publicUsers', function() {
  return Meteor.users.find({}, {fields: {'profile.name': 1, 'profile.body': 1}});
});

Meteor.publish('images', function() {
  return Images.find();
});
