// Publish certain fields publicly for all users (needed for linking to user profiles etc.)
Meteor.publish('publicUsers', function() {
  return Meteor.users.find({}, {
    fields: {
      'profile.name': 1,
      'profile.body': 1,
      'services.facebook.id': 1,
      'services.twitter.profile_image_url_https': 1,
      'services.google.picture': 1
    }
  });
});

Meteor.publish('images', function() {
  return Images.find();
});

Meteor.publish('attachments', function() {
  return Attachments.find();
});
