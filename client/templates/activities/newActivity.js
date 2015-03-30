AutoForm.hooks({
  newActivityForm: {
    before: {
      insert: function(doc) {
        var recipeId = Router.current().params.query.recipe;
        if (recipeId) doc.recipeIds = [recipeId];
        return doc;
      }
    },
		onSuccess: function(operation, result, template) {
			Router.go('activity', {_id: result});
		}
	}
});
