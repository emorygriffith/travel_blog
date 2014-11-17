(function() {

  App.Views.Login = Parse.View.extend({

    tagName: 'div',
    className: 'loginArea',

    events: {
      'submit #logIn': 'loggingIn'
    },

    template: $('#loginForm').html(),

    initialize: function() {
      this.render();

      $('#blogPosts').html(this.$el);

    },

    render: function() {

      this.$el.html(this.template);

    },

    loggingIn: function (e) {
      e.preventDefault();

      var username = $('#username').val();
      var password = $('#password').val();

      Parse.User.logIn(username, password, {
        success: function (user) {
          App.updateUser();
          App.router.navigate('user', {trigger: true});
        },
        error: function (user, error) {
          alert("Error: " + error.message);
        }
      });
      
    }



  });



}());
