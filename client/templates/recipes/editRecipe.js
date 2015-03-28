AutoForm.hooks({
  editRecipeForm: {
		onSuccess: function() {
			Router.go('recipe', {_id: this.docId});
		}
	}
});
