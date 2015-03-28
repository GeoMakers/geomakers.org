AutoForm.hooks({
  editDreamForm: {
		onSuccess: function() {
			Router.go('dream', {_id: this.docId});
		}
	}
});
