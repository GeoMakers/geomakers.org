var getQuery = function() {
  return {
    dream: this._id
  }
};

Template.dreamsList.helpers({
  getQuery: getQuery
});

Template.dream.helpers({
  getQuery: getQuery
});
