orion.addEntity('dreams', commonSchema, {
  icon: 'lightbulb-o',
  sidebarName: 'Dreams',
  pluralName: 'Dreams',
  singularName: 'Dream',
  tableColumns: [
    {data: 'title', title: 'Title'},
    orion.attributeColumn('summernote', 'body', 'Preview')
  ]
});
