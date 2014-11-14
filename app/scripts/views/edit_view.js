(function() {

  App.Views.Edit = Parse.View.extend({

    tagName: 'div',
    className: 'editPost',

    events: {
      'submit #editForm' : 'editPost',
      'click #delete' : 'deletePost'
    },

    template: _.template($('#editTemp').html()),

    initialize: function(options) {
      this.options = options;
      console.log(this.options);
      this.render();

      $('#editForm').empty();

      $('#blogPosts').html(this.$el);

    },

    render: function() {

      this.$el.empty();

      this.$el.html(this.template(this.options.currentPost.toJSON()));

    },

    editPost: function(e) {
      e.preventDefault();

      this.options.currentPost.set({
          title: $('#update_post_title').val(),
          content: $('#update_post_content').val(),
          category: $('input[name="category"]:checked').val()

      });

      this.options.currentPost.save();

      App.router.navigate('user', { trigger: true });


    },

    deletePost: function(e) {
      e.preventDefault();

      this.options.currentPost.destroy();

      App.router.navigate('user', {trigger: true});
    }


  });


}());
