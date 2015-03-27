commonSchema = {
  title: {
    type: String,
    label: 'Title'
  },
  body: orion.attribute('summernote', {
    label: 'Body',
    optional: true,
    autoform: {
      summernoteOptions: {
        toolbar: [
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['insert', ['link']]
        ]
      }
    }
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
  videos: {
    type: Array,
    label: 'Videos',
    optional: true,
    regEx: SimpleSchema.RegEx.Url
  },
  'videos.$': {
    type: String
  },
  links: {
    type: Array,
    label: 'Links',
    optional: true,
    regEx: SimpleSchema.RegEx.Url
  },
  'links.$': {
    type: String
  },
  tags: {
    type: Array,
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
      firstOption: '',
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
  },
  'tags.$': {
    type: String
  }
};
