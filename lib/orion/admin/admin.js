// Add images and attachments subscriptions to admin to allow orion to properly display images and files uploaded with cfs
orion.admin.addAdminSubscription('images');
orion.admin.addAdminSubscription('attachments');

// Begin invitation hack: avoids redirecting into admin after registering with an invitation.
// TODO: Delete when invitations are no longer needed
if (Meteor.isClient) {
  Router.route('/create-account-from-invitation/:_id', {
  	name: 'adminAccountsInvitationHacked',
  	layoutTemplate: 'appBody'
  });

  orion.admin.accountsInvitationEventsHacked = {
  	'submit form': function (event, template) {
      console.log('test');
  		event.preventDefault();
  		Session.set('adminAccountsInvitationError', null);

  		var email = template.$("[name='email']").val(),
  			name = template.$("[name='name']").val(),
  			password = template.$("[name='password']").val(),
  			passwordConfirm = template.$("[name='password-confirm']").val();

  		if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
  			Session.set('adminAccountsInvitationError', 'The email is not valid');
  			return;
  		}

  		if (password != passwordConfirm) {
  			Session.set('adminAccountsInvitationError', 'Passwords must match');
  			return;
  		}

  		Meteor.call('registerWithInvitation', {
  			invitationId: Router.current().params._id,
  			email: email,
  			password: password,
  			name: name
  		}, function(error, result) {
  			if (error) {
  				Session.set('adminAccountsInvitationError', error.reason);
  				console.log(error);
  			} else {
  				Meteor.loginWithPassword(email, password, function(error) {
  					if (error) {
  						Session.set('adminAccountsInvitationError', error.reason);
  						console.log(error);
  					} else {
  						Router.go('front-page');
  					}
  				})
  			}
  		});
  	}
  };

  Template.adminAccountsInvitationHacked.events(orion.admin.accountsInvitationEventsHacked);
  Template.adminAccountsInvitationHacked.helpers(orion.admin.accountsInvitationHelpers);
  Template.adminAccountsInvitationHacked.rendered = orion.admin.accountsInvitationRendered;
}
// End invitation hack
