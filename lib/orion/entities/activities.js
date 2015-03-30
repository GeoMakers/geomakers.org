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
    orion.attributeColumn('summernote', 'body', 'Preview')
  ]
});
