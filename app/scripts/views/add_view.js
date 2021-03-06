(function() {

  App.Views.Add = Parse.View.extend({

    tagName: 'div',
    className: 'addPost',

    events: {
      'click #publishPost' : 'publishNewPost',
      'click #draftPost': 'draftNewPost'
    },

    initialize: function() {

      this.render();

      $('#addForm').empty();

      $('#blogPosts').html(this.$el);

    },

    render: function() {



      this.$el.empty();

      this.$el.html($('#addTemp').html());

    },

    publishNewPost: function(e) {
      e.preventDefault();

      var p = new App.Models.Post({
        title: $('#post_title').val(),
        content: $('#post_content').val(),
        category: $('input[name="category"]:checked').val(),
        published: true,
        image: $('input').val(),
        user: App.user,
        author: App.user.attributes.username,
        authorId: App.user.id
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

    },

    draftNewPost: function(e) {
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

    }


  });


}());
