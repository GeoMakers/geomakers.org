geomakers.org
=============

Source code for the geomakers.org website.

Built with [Meteor](https://www.meteor.com/).

Deployment-specific configuration
----------
The solution needs an object with at least the following content to be available in [Meteor.settings](http://docs.meteor.com/#/full/meteor_settings):

    {
      "public": {
        "disqus": {
          "shortname": YOUR_DISQUS_SHORTNAME
        },
        "ga": {
          "id": YOUR_GOOGLE_ANALYTICS_TRACKING_ID
        }
      },
      "kadira": {
        "appId": YOUR_KADIRA_APP_ID,
        "appSecret": YOUR_KADIRA_APP_SECRET
      }
    }
