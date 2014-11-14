(function() {

  App.Views.Add = Parse.View.extend({

    tagName: 'div',
    className: 'addPost',

    events: {
      'submit #addForm' : 'addNewPost'
    },

    // template: _.template($('#addTemp').html()),

    initialize: function() {
      this.render();

      $('#blogPosts').html(this.$el);

    },

    render: function() {

      // this.$el.html(this.template(this.options.newpost.toJSON()));

      this.$el.html($('#addTemp').html());

    },

    addNewPost: function(e) {
      e.preventDefault();

      var p = new App.Models.Post({
        title: $('#post_title').val(),
        content: $('#post_content').val(),
        category: $('input[name="category"]:checked').val(),
        user: App.user

      });

      var postACL = new Parse.ACL(Parse.User.current());

      postACL.setPublicReadAccess(true);

      p.setACL(postACL);

      p.save(null, {
        success: function() {
          App.posts.add(p);
          App.router.navigate('user', {trigger:true});
        }

      });





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
