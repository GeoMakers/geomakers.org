orion.users.configure({
  // Allow users to create accounts, but don't give them any admin permissions
  forbidClientAccountCreation: false,
  defaultPermissions: ['files.upload', 'entity.dreams.personal', 'entity.recipes.personal', 'entity.activities.personal'],

  // Set home route path to root (user is redirected here after sign out)
  homeRoutePath: '/'
})

// Configure sign in route to use default sign in template (without this, the Orion Admin login template would be used)
AccountsTemplates.configureRoute('signIn', {

  // Unfortunately, AccountsTemplates routes are not added to the Router object before our manual routes in router.js, so we have to use a path that does not conflict with the slug routing for content pages defined there
  path: '/users/accounts/sign-in'
});
