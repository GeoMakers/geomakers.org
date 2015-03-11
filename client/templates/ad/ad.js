Meteor.startup(function() {
  var adSenseScript = document.createElement('script');
  adSenseScript.setAttribute('src', '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
  adSenseScript.setAttribute('async', 'async');
  document.body.appendChild(adSenseScript);
});

Template.ad.rendered = function() {
  (adsbygoogle = window.adsbygoogle || []).push({});
};
