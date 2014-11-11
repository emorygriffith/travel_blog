(function() {

  App.Routers.AppRouter = Parse.Router.extend({

    initialize: function(){
      Parse.history.start();
    },

    routes: {
      '': 'home'
    },

    home: function() {
      new App.Views.Home({ collection: App.posts });
    }



  });



}());
