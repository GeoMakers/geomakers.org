Template.contentPage.helpers({
  compiledBody: function() {
    var templateName = 'contentPageCompiledBodyTemplate';

    try {
      Template.__checkName(templateName);
    } catch (error) {
      // If template already exists, delete it (this can happen if content updates and surrounding template re-renders)
      delete Template[templateName];
    } finally {
    }

    templateString = $('<textarea/>').html(this.body).text();
    var compiled = SpacebarsCompiler.compile(templateString, {isTemplate: true});
    var renderer = eval(compiled);
    Template.__define__(templateName, renderer);

    return templateName;
  }
});
