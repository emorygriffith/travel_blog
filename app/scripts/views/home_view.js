(function() {

  App.Views.Home = Parse.View.extend({

    tagName: 'ul',
    className: 'allPosts',

    events: {},

    initialize: function(options) {
      console.log('init');
      this.options = options;

      this.render();

      this.collection.off();
      this.collections.on('sync', this.render, this);

      $('#blogPosts').html(this.$el);

    },

    render: function() {
      console.log('rendered');
    }



  });



}());
