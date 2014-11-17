(function() {

  App.Views.Category = Parse.View.extend({

    tagName: 'ul',
    className: 'categoryPosts',

    events: {},

    template: _.template($('#categoryTemp').html()),

    initialize: function(options) {
      this.options = options;

      this.collection.off();
      this.collection.on('sync', this.postQuery, this);

      $('#blogPosts').html(this.$el);

      this.postQuery();

    },

    postQuery: function() {

      var self = this;

      var category_posts = new Parse.Query(App.Models.Post);
      category_posts.equalTo('category', this.options.categoryPosts);

      category_posts.find({
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
