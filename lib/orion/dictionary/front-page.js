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
