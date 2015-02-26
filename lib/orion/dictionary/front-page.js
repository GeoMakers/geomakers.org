orion.dictionary.addDefinition('frontPageMakerSpacesHeading', 'frontPage', {
  type: String,
  label: "MakerSpaces Heading"
});

orion.dictionary.addDefinition('frontPageMakerSpacesBody', 'frontPage',
  orion.attribute('summernote', {
    label: 'MakerSpaces Body',
    optional: true
  })
);

orion.dictionary.addDefinition('frontPageMakerSpacesLinkText', 'frontPage', {
  type: String,
  label: "MakerSpaces Link Text"
});

orion.dictionary.addDefinition('frontPageMakerResourcesHeading', 'frontPage', {
  type: String,
  label: "Maker Resources Heading"
});

orion.dictionary.addDefinition('frontPageMakerResourcesBody', 'frontPage',
  orion.attribute('summernote', {
    label: 'Maker Resources Body',
    optional: true
  })
);

orion.dictionary.addDefinition('frontPageMakerResourcesLinkText', 'frontPage', {
  type: String,
  label: "Maker Resources Link Text"
});

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
