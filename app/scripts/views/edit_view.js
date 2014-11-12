(function() {

  App.Views.Edit = Parse.View.extend({

    tagName: 'div',
    className: 'editPost',

    events: {
      'submit #editForm' : 'editPost'
    },

    template: _.template($('#editTemp').html()),

    initialize: function(options) {
      this.options = options;
      this.render();

      $('#editForm').empty();

      $('#blogPosts').html(this.$el);

    },

    render: function() {

      this.$el.empty();

      this.$el.html(this.template(this.options.newpost.toJSON()));

    },

    editPost: function(e) {
      e.preventDefault();

      this.options.newpost.set({
          title: $('#upate_post_title').val(),
          content: $('#update_post_content').val(),
          category: $('input[name="category"]:checked').val()

      });

      this.options.newpost.save();

      App.router.navigate('user', { trigger: true });


    }


  });


}());
