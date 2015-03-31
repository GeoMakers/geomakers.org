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
      orion.subs.subscribe('entity', 'dreams'),
      Meteor.subscribe('images')
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
  waitOn: function() {
    return [
      Meteor.subscribe('images')
    ];
  },
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
      orion.subs.subscribe('entity', 'dreams', {_id: this.params._id}),
      Meteor.subscribe('images')
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
      orion.subs.subscribe('entity', 'dreams', {_id: this.params._id}),
      Meteor.subscribe('images')
    ];
  },
  data: function() {
    return orion.entities.dreams.collection.findOne({_id: this.params._id});
  }
});

Router.route('/recipes', {
  name: 'recipes',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'recipes'),
      orion.subs.subscribe('entity', 'dreams', {_id: this.params.query.dream}),
      Meteor.subscribe('images')
    ];
  },
  data: function() {
    return {
      title: 'GeoMaker Recipes',
      recipes: orion.entities.recipes.collection.find(this.params.query.dream ? {dreamIds: this.params.query.dream} : {}, {sort: {createdAt: -1}, limit: Number(this.params.query.limit) || Config.pageSize}),
      dream: orion.entities.dreams.collection.findOne({_id: this.params.query.dream})
    };
  }
});

Router.route('/recipes/new', {
  name: 'newRecipe',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'dreams', {_id: this.params.query.dream}),
      Meteor.subscribe('images')
    ];
  },
  data: function() {
    return {
      title: 'New GeoMaker Recipe',
      collection: orion.entities.recipes.collection,
      dream: orion.entities.dreams.collection.findOne({_id: this.params.query.dream})
    };
  }
});

Router.route('/recipes/:_id', {
  name: 'recipe',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'recipes', {_id: this.params._id}),
      orion.subs.subscribe('entity', 'dreams'),
      Meteor.subscribe('images'),
      Meteor.subscribe('attachments')
    ];
  },
  data: function() {
    return orion.entities.recipes.collection.findOne({_id: this.params._id}, {transform: function(recipe) {
      if (_.isArray(recipe.dreamIds)) {
        _.extend(recipe, {
          dreams: orion.entities.dreams.collection.find({_id: {$in: recipe.dreamIds}})
        });
      }
      return recipe;
    }});
  }
});

Router.route('/recipes/:_id/edit', {
  name: 'editRecipe',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'recipes', {_id: this.params._id}),
      Meteor.subscribe('images')
    ];
  },
  data: function() {
    return orion.entities.recipes.collection.findOne({_id: this.params._id});
  }
});

Router.route('/activities', {
  name: 'activities',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'activities'),
      orion.subs.subscribe('entity', 'recipes', {_id: this.params.query.recipe}),
      Meteor.subscribe('images')
    ];
  },
  data: function() {
    return {
      title: 'GeoBooster Activities',
      activities: orion.entities.activities.collection.find(this.params.query.recipe ? {recipeIds: this.params.query.recipe} : {}, {sort: {createdAt: -1}, limit: Number(this.params.query.limit) || Config.pageSize}),
      recipe: orion.entities.recipes.collection.findOne({_id: this.params.query.recipe})
    };
  }
});

Router.route('/activities/new', {
  name: 'newActivity',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'recipes', {_id: this.params.query.recipe}),
      Meteor.subscribe('images')
    ];
  },
  data: function() {
    return {
      title: 'New GeoBooster Activity',
      collection: orion.entities.activities.collection,
      recipe: orion.entities.recipes.collection.findOne({_id: this.params.query.recipe})
    };
  }
});

Router.route('/activities/:_id', {
  name: 'activity',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'activities', {_id: this.params._id}),
      orion.subs.subscribe('entity', 'recipes'),
      Meteor.subscribe('images')
    ];
  },
  data: function() {
    return orion.entities.activities.collection.findOne({_id: this.params._id}, {transform: function(activity) {
      if (_.isArray(activity.recipeIds)) {
        _.extend(activity, {
          recipes: orion.entities.recipes.collection.find({_id: {$in: activity.recipeIds}})
        });
      }
      return activity;
    }});
  }
});

Router.route('/activities/:_id/edit', {
  name: 'editActivity',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'activities', {_id: this.params._id}),
      Meteor.subscribe('images')
    ];
  },
  data: function() {
    return orion.entities.activities.collection.findOne({_id: this.params._id});
  }
});

Router.route('/tags/:tag', {
  name: 'tag',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'dreams'),
      orion.subs.subscribe('entity', 'recipes'),
      orion.subs.subscribe('entity', 'activities')
    ];
  },
  data: function() {
    var tag = this.params.tag;
    var dreams = orion.entities.dreams.collection.find({tags: tag});
    var recipes = orion.entities.recipes.collection.find({tags: tag});
    var activities = orion.entities.activities.collection.find({tags: tag});
    return {
      title: tag,
      tag: tag,
      dreams: dreams.count() > 0 ? dreams : null,
      recipes: recipes.count() > 0 ? recipes : null,
      activities: activities.count() > 0 ? activities : null
    }
  }
});

Router.route('/users/:_id', {
  name: 'user',
  waitOn: function() {
    return [
      orion.subs.subscribe('entity', 'dreams', {createdBy: this.params._id}),
      orion.subs.subscribe('entity', 'recipes', {createdBy: this.params._id}),
      orion.subs.subscribe('entity', 'activities', {createdBy: this.params._id})
    ];
  },
  data: function() {
    return Meteor.users.findOne({_id: this.params._id}, {transform: function(user) {
      _.extend(user, {
        dreams: orion.entities.dreams.collection.find({createdBy: user._id}, {sort: {createdAt: -1}}),
        recipes: orion.entities.recipes.collection.find({createdBy: user._id}, {sort: {createdAt: -1}}),
        activities: orion.entities.activities.collection.find({createdBy: user._id}, {sort: {createdAt: -1}})
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
