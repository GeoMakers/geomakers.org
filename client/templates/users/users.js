Template.profilePic.helpers({
  gravatarImageUrl: function() {
    return Gravatar.imageUrl(this.emails[0].address, {
      default: 'mm'
    });
  }
});
