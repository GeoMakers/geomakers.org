// Available sections for content pages
var sections = [
  {slug: 'about', label: "About"},
  {slug: 'donate', label: "Donate"}
];

orion.addEntity('contentPages', {
  // sectionSlug and slug are used for very simple routing of content pages, see router.js
  sectionSlug: {
    type: String,
    label: 'Section',
    optional: true,
    autoform: {
      type: "select",
      options: sections.map(function(section) {
        return {value: section.slug, label: section.label};
      }),
      afFieldInput: {
        firstOption: "None (page will be in site root)"
      }
    }
  },
  slug: {
    type: String,
    label: 'Slug (must be unique among content pages)',
  },
  title: {
    type: String,
    label: 'Title',
  },
  body: orion.attribute('summernote', {
    label: 'Body',
    optional: true
  })
}, {
  icon: 'file-text',
  sidebarName: 'Content Pages',
  pluralName: 'Content Pages',
  singularName: 'Content Page',
  tableColumns: [
    {data: 'title', title: 'Title'},
    {data: 'sectionSlug', title: 'Section', render: function(val, type, doc) {
      var section = _.findWhere(sections, {slug: val});
      return section ? section.label : '';
    }},
    {data: 'slug', title: 'Slug'},
    orion.attributeColumn('summernote', 'body', 'Preview')
  ]
});
