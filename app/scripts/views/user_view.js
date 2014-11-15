(function() {

  App.Views.User = Parse.View.extend({

    tagName: 'ul',
    className: 'myPosts',

    events: {},

    template: _.template($('#userTemp').html()),

    initialize: function(options) {
      this.options = options;

      this.collection.off();
      this.collection.on('sync', this.postQuery, this);

      $('#blogPosts').html(this.$el);

      this.postQuery();

    },

    postQuery: function() {

      var self = this;

      var user_post = new Parse.Query(App.Models.Post);

      user_post.equalTo('user', App.user);

      user_post.find({
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
        console.log(p);
        self.$el.append(self.template(p.toJSON()));
        if(p.attributes.published === true) {
          $('#textDraft').remove();
        }
      });

      return this;

    }




  });



}());
