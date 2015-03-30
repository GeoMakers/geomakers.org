AutoForm.hooks({
  newRecipeForm: {
    before: {
      insert: function(doc) {
        var dreamId = Router.current().params.query.dream;
        if (dreamId) doc.dreamIds = [dreamId];
        return doc;
      }
    },
		onSuccess: function(operation, result, template) {
			Router.go('recipe', {_id: result});
		}
	}
});
