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


      var all_post = new Parse.Query(App.Models.Post);

      all_post.find({
        success: function (results) {

          self.collection = results;

          self.render();


        },
        error: function(a, b) {
          console.log(b);


        }
    });

    },

    render: function() {

      var self = this;


      this.$el.empty();

      var local_collection = this.collection;
      console.log(local_collection);

      _.each(local_collection, function(p){
        self.$el.append(self.template(p.toJSON()));
      });


      return this;


    }





  });



}());
