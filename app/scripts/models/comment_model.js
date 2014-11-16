(function () {

  App.Models.Comment = Parse.Object.extend({

    className: 'Comments',
    idAttribute: 'objectId',

    defaults: {
      commentText: '',
      commentAuthor: ''
    },

    initialize: function() {

    }

  });


}());
