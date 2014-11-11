(function() {

  App.Routers.AppRouter = Parse.Router.extend({

    initialize: function(){
      Parse.history.start();
    },

    routes: {
      '': 'home'
    }



  });



}());
