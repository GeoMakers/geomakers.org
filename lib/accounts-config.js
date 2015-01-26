orion.users.configure({
  // Allow users to create accounts, but don't give them any admin permissions
  // TODO Actually forbidden during development, change this when launching
  forbidClientAccountCreation: true,
  defaultPermissions: [],

  // Set home route path to root (user is redirected here after sign out)
  homeRoutePath: '/'
})

// Configure sign in route to use default sign in template (without this, the Orion Admin login template would be used)
AccountsTemplates.configureRoute('signIn');
