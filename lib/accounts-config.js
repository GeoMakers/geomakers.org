orion.users.configure({
  // Allow users to create accounts, but don't give them any admin permissions
  forbidClientAccountCreation: false,
  defaultPermissions: ['files.upload', 'entity.dreams.personal', 'entity.recipes.personal', 'entity.activities.personal'],

  // Enable password reset
  showForgotPasswordLink: true,

  // Enable email verification
  sendVerificationEmail: true,

  // Set home route path to root (user is redirected here after sign out)
  homeRoutePath: '/'
})

var accountsPathPrefix = '/users/accounts';

// Configure sign in route to use default sign in template (without this, the Orion Admin login template would be used)
AccountsTemplates.configureRoute('signIn', {

  // Unfortunately, AccountsTemplates routes are not added to the Router object before our manual routes in router.js, so we have to use a path that does not conflict with the slug routing for content pages defined there
  path: accountsPathPrefix + '/sign-in'
});

// Configure forgot password route
AccountsTemplates.configureRoute('forgotPwd', {
  path: accountsPathPrefix + '/forgot-password'
});

// Configure sign up route
AccountsTemplates.configureRoute('signUp', {
  path: accountsPathPrefix + '/sign-up'
});

// Configure verify email route
AccountsTemplates.configureRoute('verifyEmail', {
  path: accountsPathPrefix + '/verify-email'
});

if (Meteor.isServer) {
  Accounts.emailTemplates.siteName = "GeoMakers";
  Accounts.emailTemplates.from = "GeoMakers <web@geomakers.org>";

  Accounts.emailTemplates.verifyEmail.subject = function (user) {
      return "Welcome to GeoMakers, " + user.profile.name;
  };
  Accounts.emailTemplates.verifyEmail.text = function (user, url) {
     return "Welcome to GeoMakers. Please verify your email by clicking the link below:\n\n"
       + url;
  };

  Accounts.emailTemplates.resetPassword.subject = function (user) {
      return "Reset your password on GeoMakers";
  };
  Accounts.emailTemplates.resetPassword.text = function (user, url) {
     return "To reset your password, please click the link below:\n\n"
       + url;
  };
}
