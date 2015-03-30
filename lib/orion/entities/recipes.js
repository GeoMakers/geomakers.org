orion.addEntity('recipes', _.extend(_.clone(commonSchema), {
  supplies: {
    type: Array,
    label: 'Supplies',
    optional: true
  },
  'supplies.$': {
    type: String
  },
  steps: {
    type: Array,
    optional: true
  },
  'steps.$': {
    type: new SimpleSchema({
      title: {
        type: String,
        optional: true
      },
      body: orion.attribute('summernote', {
        autoform: {
          summernoteOptions: {
            toolbar: [
              ['style', ['bold', 'italic', 'underline', 'clear']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['insert', ['link']]
            ]
          }
        }
      })
    })
  },
  fileIds: {
    type: Array,
    label: 'Files',
    optional: true
  },
  'fileIds.$': {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'attachments'
      }
    }
  },
  dreamIds: {
    type: Array,
    label: 'Dreams',
    optional: true,
    autoform: {
      omit: true
    }
  },
  'dreamIds.$': {
    type: String
  }
}), {
  icon: 'wrench',
  sidebarName: 'Recipes',
  pluralName: 'Recipes',
  singularName: 'Recipe',
  tableColumns: [
    {data: 'title', title: 'Title'},
    orion.attributeColumn('summernote', 'body', 'Preview')
  ]
});
