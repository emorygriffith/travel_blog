(function() {

  App.Views.User = Parse.View.extend({

    tagName: 'ul',
    className: 'myPosts',

    events: {},

    template: _.template($('#userTemp').html()),

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

      this.collection.each(function(mp){
        self.$el.append(self.template(mp.toJSON()));

      });
    }



  });



}());
