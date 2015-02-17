orion.addEntity('dreams', {
  title: {
    type: String,
    label: 'Title',
  },
  body: orion.attribute('summernote', {
    label: 'Body',
    optional: true
  }),
  imageIds: {
    type: Array,
    label: 'Images',
    optional: true
  },
  'imageIds.$': {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'images'
      }
    }
  },
  links: {
    type: [String],
    label: 'Links',
    optional: true,
    regEx: SimpleSchema.RegEx.Url
  },
  tags: {
    type: [String],
    label: 'Tags',
    optional: true,
    autoform: {
      type: 'selectize',
      options: function() {
        // Slight hack necessary to populate options with current tags when editing (other suggestions will be loaded later as the user types)
        var item = Router.current().data().item;
        if (item && item.tags) { // Otherwise this is probably an insert
          return item.tags.map(function(tag) {
            return {value: tag, label: tag};
          })
        }
      },
      afFieldInput: {
        multiple: true,
        selectizeOptions: {
          create: true,
          load: function(query, callback) {
            if (!query.length) return callback();

            // Load tag suggestions from server asynchronously
            Meteor.call('tags', query, function(error, result) {
              if (!result.length) return callback();
              callback(result.map(function(tag) {
                return {value: tag, text: tag};
              }));
            });
          }
        }
      }
    }
  }
}, {
  icon: 'lightbulb-o',
  sidebarName: 'Dreams',
  pluralName: 'Dreams',
  singularName: 'Dream',
  tableColumns: [
    {data: 'title', title: 'Title'},
    orion.attributeColumn('summernote', 'body', 'Preview')
  ]
});
