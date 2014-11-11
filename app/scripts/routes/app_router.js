(function() {

  App.Routers.AppRouter = Parse.Router.extend({

    initialize: function(){
      Parse.history.start();
    },

    routes: {
      '': 'home',
      'login': 'userLogin',
      'signup': 'userSignup'

    },

    home: function() {
      new App.Views.Home({ collection: App.posts });
    },

    userLogin: function() {
      new App.Views.Login();
    },

    userSignup: function() {
      new App.Views.Signup();
    }

  });



}());
