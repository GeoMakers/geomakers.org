orion.dictionary.addDefinition('siteName', 'site', {
  type: String,
  label: "Site Name"
});

orion.dictionary.addDefinition('siteDescription', 'site', {
  type: String,
  label: "Description of the site",
  autoform: {
    type: 'textarea'
  }
});
