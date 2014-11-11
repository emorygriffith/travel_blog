(function() {

  App.Routers.AppRouter = Parse.Router.extend({

    initialize: function(){
      Parse.history.start();
    },

    routes: {
      '': 'home',
      'login': 'userLogin'
    },

    home: function() {
      new App.Views.Home({ collection: App.posts });
    },

    userLogin: function() {
      console.log('yeahhh!');
      new App.Views.Login();
    }

  });



}());
