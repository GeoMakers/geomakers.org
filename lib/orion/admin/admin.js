// Add images and attachments subscriptions to admin to allow orion to properly display images and files uploaded with cfs
orion.admin.addAdminSubscription('images');
orion.admin.addAdminSubscription('attachments');

orion.admin.addSidebarTab({
  routeName: 'front-page',
  navbarTitle: 'Go to Home Page',
  icon: 'home'
});
