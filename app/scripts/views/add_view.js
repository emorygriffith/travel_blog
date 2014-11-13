(function() {

  App.Views.Add = Parse.View.extend({

    tagName: 'div',
    className: 'addPost',

    events: {
      'submit #addForm' : 'addNewPost'
    },

    template: _.template($('#addTemp').html()),

    initialize: function(options) {
      this.options = options;
      this.render();

      $('#addForm').empty();

      $('#blogPosts').html(this.$el);

    },

    render: function() {

      this.$el.empty();

      this.$el.html(this.template(this.options.newpost.toJSON()));

    },

    addNewPost: function(e) {
      e.preventDefault();

      var p = new App.Models.Post({
        title: $('#post_title').val(),
        content: $('#post_content').val(),
        category: $('input[name="category"]:checked').val(),
        user: App.user

      });

      p.setACL(new Parse.ACL(App.user));

      p.save(null, {
        success: function() {
          App.posts.add(p);
          App.router.navigate('user', {trigger:true});
        }

      })





      // this.options.newpost.set({
      //     title: $('#post_title').val(),
      //     content: $('#post_content').val(),
      //     category: $('input[name="category"]:checked').val()
      //
      // });
      //
      // this.options.newpost.save();
      //
      // App.router.navigate('user', { trigger: true });


    }


  });


}());
