(function() {

  App.Views.Home = Parse.View.extend({

    tagName: 'ul',
    className: 'allPosts',

    events: {},

    template: _.template($('#postTemp').html()),

    initialize: function(options) {
      this.options = options;

      this.collection.off();
      this.collection.on('sync', this.postQuery, this);

      $('#blogPosts').html(this.$el);

      this.postQuery();

    },

    postQuery: function() {


      var self = this;


      var all_posts = new Parse.Query(App.Models.Post);

      all_posts.find({
        success: function (results) {

          self.collection = results;

          self.render();
        }

      });

    },

    render: function() {

      var self = this;


      this.$el.empty();
      // var local_collection = this.collection;
      console.log(App.posts);
      //
      // var search = local_collection.attributes;
      // console.log(search);
      console.log(App.posts.models);


      _.each(App.posts.models, function(p){
        // if(local_collection.attributes.published === true) {
          self.$el.append(self.template(p.toJSON()));
        // }
      });

      return this;

    }





  });



}());
