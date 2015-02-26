Meteor.startup(function() {
  Avatar.options = {
    gravatarDefault: "mm"
  };
});

Template.appBody.helpers({
  routeName: function() {
    return Router.current().route.getName();
  }
})

Template.appBody.rendered = function() {
  SVGInjector(this.$('img[src$=".svg"]'), {
    each: function(svg) {
      svg.setAttribute('class', 'drawing');
      new Vivus(svg, {type: 'delayed', duration: 150}, function() {
        this.el.removeAttribute('class');
      });
    }
  });
};
