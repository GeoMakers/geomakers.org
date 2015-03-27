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
    label: 'Steps',
    optional: true
  },
  'steps.$': orion.attribute('summernote', {
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
