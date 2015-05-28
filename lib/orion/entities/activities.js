orion.addEntity('activities', _.extend(_.clone(commonSchema), {
  location: {
    type: Object,
    label: 'Location',
    optional: true,
    autoform: {
      type: 'map',
      afFieldInput: {
        searchBox: true
      }
    }
  },
  'location.lat': {
    type: String
  },
  'location.lng': {
    type: String
  },
  date: {
    type: Date,
    label: 'Date and Time',
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'datetime-local'
      }
    }
  },
  recipeIds: {
    type: Array,
    label: 'Recipes',
    optional: true,
    autoform: {
      omit: true
    }
  },
  'recipeIds.$': {
    type: String
  }
}), {
  icon: 'bullhorn',
  sidebarName: 'Activities',
  pluralName: 'Activities',
  singularName: 'Activity',
  tableColumns: [
    {data: 'title', title: 'Title'},
    orion.attributeColumn('summernote', 'body', 'Preview'),
    {data: 'editorsPick', title: "Editor's Pick"}
  ]
});
