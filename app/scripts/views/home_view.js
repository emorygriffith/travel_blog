(function() {

  App.Views.Home = Parse.View.extend({

    tagName: 'ul',
    className: 'allPosts',

    events: {},

    initialize: function(options) {
      console.log('init');
      this.options = options;

      this.render();

    },

    render: function() {
      console.log('rendered');
    }



  });



}());
