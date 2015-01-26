Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      orion.subs.subscribe('dictionary')
    ];
  }
});

if (Meteor.isClient) {
  Router.onAfterAction(function() {
    // Collapse any open collapsible menu after navigation
    $('.navbar-collapse.collapse.in').collapse('hide');

    // Set SEO data
    var data = typeof this.data === 'function' ? this.data() : undefined;
    SEO.set({
      title: (data && data.title ? data.title + ' — ' : '') + orion.dictionary.get('siteName', 'GeoMakers'),
      meta: {
        // FIXME: Make this an abstract of the content
        description: orion.dictionary.get('siteDescription', '')
      }
    });
  });
}

Router.route('/', function () {
  this.render('frontPage');
});

Router.route('/dreams', {
  name: 'dreams',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'dreams')
    ];
  },
  data: function() {
    return {
      title: 'GeoDreamers',
      dreams: orion.entities.dreams.collection.find({}, {sort: {createdAt: -1}})
    };
  }
});

Router.route('/dreams/:_id', {
  name: 'dream',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'dreams')
    ];
  },
  data: function() {
    return orion.entities.dreams.collection.findOne({_id: this.params._id});
  }
});
