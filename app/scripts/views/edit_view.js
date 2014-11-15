(function() {

  App.Views.Edit = Parse.View.extend({

    tagName: 'div',
    className: 'editPost',

    events: {
      'click #updatePubPost' : 'updatePubPost',
      'click #updateDraftPost' : 'updateDraftPost',
      'click #delete' : 'deletePost'
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

      this.$el.html(this.template(this.options.currentPost.toJSON()));

    },

    updatePubPost: function(e) {
      console.log(e);
      e.preventDefault();

      this.options.currentPost.set({
          title: $('#update_post_title').val(),
          content: $('#update_post_content').val(),
          category: $('input[name="category"]:checked').val(),
          published: true
      });

      this.options.currentPost.attributes.published = false;

      this.options.currentPost.save();

      App.router.navigate('user', { trigger: true });

    },

    updateDraftPost: function(e) {
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
