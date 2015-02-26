Template.footer.rendered = function() {
  SVGInjector(this.$('img[src$=".svg"]'), {
    each: function(svg) {
      svg.setAttribute('class', 'drawing');
      new Vivus(svg, {type: 'delayed', duration: 150}, function() {
        this.el.setAttribute('class', 'drawn');
      });
    }
  });
};
