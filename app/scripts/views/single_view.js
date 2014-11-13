(function() {

  App.Views.Single = Parse.View.extend({

    tagName: 'div',
    className: 'singlePost',

    events: {

    },

    template: _.template($('#singleTemp').html()),

    initialize: function(options) {
      this.options = options;
      this.render();

      $('#blogPosts').html(this.$el);

    },

    render: function() {

      this.$el.empty();

      this.$el.html(this.template(this.options.currentPost.toJSON()));

    },


  });


}());
