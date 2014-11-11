(function() {

  App.Views.Home = Parse.View.extend({

    tagName: 'ul',
    className: 'allPosts',

    events: {},

    template: _.template($('#postTemp').html()),

    initialize: function(options) {
      this.options = options;

      this.render();

      this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#blogPosts').html(this.$el);

    },

    render: function() {
      var self = this;

      this.$el.empty();


      this.collection.each(function(p){
        self.$el.append(self.template(p.toJSON()));

      });
    }



  });



}());
