AutoForm.hooks({
  editActivityForm: {
		onSuccess: function() {
			Router.go('activity', {_id: this.docId});
		}
	}
});
