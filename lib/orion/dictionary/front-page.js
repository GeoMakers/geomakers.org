orion.dictionary.addDefinition('frontPageDonateHeading', 'frontPage', {
  type: String,
  label: "Donate Heading"
});

orion.dictionary.addDefinition('frontPageDonateBody', 'frontPage',
  orion.attribute('summernote', {
    label: 'Donate Body',
    optional: true
  })
);

orion.dictionary.addDefinition('frontPageDonateLinkText', 'frontPage', {
  type: String,
  label: "Donate Link Text"
});
