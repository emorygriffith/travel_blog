(function () {

  App.Models.Post = Parse.Object.extend({

    className: 'Post',

    idAttribute: 'objectId',

    defaults: {
      title: '',
      content: '',
      category: '',
      status: ''
    },

    initialize: function(){
      //var t = this.get('title');
      //console.log(t + ' has been added');
    }

  });

}());
