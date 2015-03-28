AutoForm.hooks({
  newRecipeForm: {
		onSuccess: function(operation, result, template) {
			Router.go('recipe', {_id: result});
		}
	}
});
