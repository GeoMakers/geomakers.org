orion.addEntity('dream', {
  title: {
    type: String,
    label: 'Title',
  },
  body: orion.attribute('summernote', {
    label: 'Body',
    optional: true
  })
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
