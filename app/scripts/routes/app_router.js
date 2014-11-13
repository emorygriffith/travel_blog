(function() {

  App.Routers.AppRouter = Parse.Router.extend({

    routes: {
      '': 'home',
      'login': 'userLogin',
      'signup': 'userSignup',
      'user' : 'userPage',
      'add' : 'addPost',
      'edit/:id' : 'editPost',
      'post/:id': 'singlePost'

    },



    home: function() {

      // if(!App.user) {
      //   return App.router.navigate('', {trigger: true});
      // }

      new App.Views.Home({ collection: App.posts });
    },

    userLogin: function() {
      new App.Views.Login();
    },

    userSignup: function() {
      new App.Views.Signup();
    },

    userPage: function() {
      new App.Views.User({ collection: App.posts });
    },

    addPost: function() {
      new App.Views.Add({ newpost: new App.Models.Post() });
    },

    editPost: function(info) {
      var data = App.posts.get(info);
      new App.Views.Edit({ currentPost: data });
    },

    singlePost: function(info){
      var data = App.posts.get(info);
      new App.Views.Single({ currentPost: data });
    }

  });



}());
