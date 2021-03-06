(function() {

  App.Views.Author = Parse.View.extend({

    tagName: 'ul',
    className: 'authorPosts',

    events: {},

    template: _.template($('#authorTemp').html()),

    initialize: function(options) {
      this.options = options;

      this.collection.off();
      this.collection.on('sync', this.postQuery, this);

      $('#blogPosts').html(this.$el);

      this.postQuery();

    },

    postQuery: function() {

      var self = this;

      var author_posts = new Parse.Query(App.Models.Post);
      author_posts.equalTo('author', this.options.authorPosts);

      author_posts.find({
        success: function (results) {
          self.collection = results;
          self.render();
        }
      });

    },

    render: function() {

      var self = this;

      this.$el.empty();

      _.each(self.collection, function(p) {
        self.$el.append(self.template(p.toJSON()));
      });

      return this;

    }


  });


}());
