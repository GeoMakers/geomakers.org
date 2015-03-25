Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing data
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      orion.subs.subscribe('dictionary'),
      Meteor.subscribe('publicUsers')
    ];
  }
});

Router.plugin('dataNotFound');

// Ensure sign in for entire site (except the actual sign in page) during development
// TODO Disable this when launching
Router.onBeforeAction(AccountsTemplates.ensureSignedIn, {
  except: ['atSignIn', 'adminAccountsInvitation']
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

Router.route('/', {
  name: 'front-page'
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
      title: 'GeoDreams',
      dreams: orion.entities.dreams.collection.find({}, {sort: {createdAt: -1}, limit: Number(this.params.query.limit) || Config.pageSize})
    };
  }
});

Router.route('/dreams/new', {
  name: 'newDream',
  data: function() {
    return {
      title: 'New GeoDream',
      collection: orion.entities.dreams.collection
    };
  }
});

Router.route('/dreams/:_id', {
  name: 'dream',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'dreams', {_id: this.params._id})
    ];
  },
  data: function() {
    return orion.entities.dreams.collection.findOne({_id: this.params._id});
  }
});

Router.route('/dreams/:_id/edit', {
  name: 'editDream',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'dreams', {_id: this.params._id})
    ];
  },
  data: function() {
    return orion.entities.dreams.collection.findOne({_id: this.params._id});
  }
});

Router.route('/tags/:tag', {
  name: 'tag',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'dreams')
    ];
  },
  data: function() {
    var tag = this.params.tag;
    var dreams = orion.entities.dreams.collection.find({tags: tag});
    return {
      title: tag,
      tag: tag,
      dreams: dreams.count() > 0 ? dreams : null
    }
  }
});

Router.route('/users/:_id', {
  name: 'user',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'dreams', {createdBy: this.params._id})
    ];
  },
  data: function() {
    return Meteor.users.findOne({_id: this.params._id}, {transform: function(user) {
      _.extend(user, {
        dreams: orion.entities.dreams.collection.find({createdBy: user._id}, {sort: {createdAt: -1}})
      })
      return user;
    }});
  }
});

Router.route('/makerspaces', {
  name: 'makerspaces',
  data: function() {
    return {
      title: 'Makerspaces'
    }
  }
});

// Very basic slug routing of content pages. This definition must be placed last to let other routes take priority.
Router.route('/:sectionSlug?/:slug', {
  name: 'contentPage',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'contentPages', {sectionSlug: this.params.sectionSlug, slug: this.params.slug})
    ];
  },
  data: function() {
    return orion.entities.contentPages.collection.findOne({sectionSlug: this.params.sectionSlug, slug: this.params.slug});
  }
})
