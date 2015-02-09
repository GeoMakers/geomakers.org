orion.addEntity('dreams', {
  title: {
    type: String,
    label: 'Title',
  },
  body: orion.attribute('summernote', {
    label: 'Body',
    optional: true
  }),
  links: {
    type: [String],
    label: 'Links',
    optional: true,
    regEx: SimpleSchema.RegEx.Url
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
