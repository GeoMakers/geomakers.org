Schema = {};

Schema.UserProfile = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  body: orion.attribute('summernote', {
    label: 'Body',
    optional: true,
    autoform: {
      summernoteOptions: {
        toolbar: [
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['insert', ['link']]
        ]
      }
    }
  })
});

Schema.User = new SimpleSchema({
  createdAt: {
    type: Date,
    autoform: {
      omit: true
    }
  },
  profile: {
    type: Schema.UserProfile,
    optional: true
  },
  // TODO Allow user to change email address in a secure, verifiable way
  emails: {
    type: [Object],
    // this must be optional if you also use other login services like facebook,
    // but if you use only accounts-password, then it can be required
    optional: true,
    autoform: {
      omit: true
    }
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean,
    autoform: {
      omit: true
    }
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
    autoform: {
      omit: true
    }
  },
  permissions: {
    type: [String],
    optional: true,
    blackbox: true,
    autoform: {
      omit: true
    }
  },
  isAdmin: {
    type: Boolean,
    optional: true,
    blackbox: true,
    autoform: {
      omit: true
    }
  },
  registrationType: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  }
});

Meteor.users.attachSchema(Schema.User);
