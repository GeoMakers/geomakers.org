Template.dreamActions.helpers({
  getQuery: function() {
    return {
      dream: this._id
    };
  },
  class: function() {
    return Router.current().route.getName() === 'dream' ? 'btn btn-make' : '';
  }
});
