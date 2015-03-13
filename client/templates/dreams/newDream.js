AutoForm.hooks({
  newDreamForm: {
		onSuccess: function(operation, result, template) {
			Router.go('dream', {_id: result});
		}
	}
});
