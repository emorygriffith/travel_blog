(function() {

  App.Views.Add = Parse.View.extend({

    tagName: 'div',
    className: 'addPost',

    events: {},

    template: _.template($('#addTemp').html()),

    initialize: function() {
      this.render();

      $('#blogPosts').html(this.$el);

    },

    render: function() {

      this.$el.html(this.template);

    }


  });


}());
