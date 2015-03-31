AutoForm.hooks({
  editUserForm: {
		onSuccess: function() {
			Router.go('user', {_id: this.docId});
		}
	}
});
