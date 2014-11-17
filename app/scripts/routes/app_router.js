(function() {

  App.Routers.AppRouter = Parse.Router.extend({

    routes: {
      '': 'home',
      'login': 'userLogin',
      'signup': 'userSignup',
      'user' : 'userPage',
      'add' : 'addPost',
      'edit/:id' : 'editPost',
      'post/:id': 'singlePost',
      'author/:id' : 'authorPage',
      'category/:name' : 'categoryPage'

    },

    home: function() {

      // Displaying Buttons
      if(App.user) {
        $('.logInBtn').addClass('hide');
        $('.signUpBtn').addClass('hide');
      } else if (!App.user) {
        $('.addBtn').addClass('hide');
        $('.accBtn').addClass('hide');
        $('.logOutBtn').addClass('hide');
      }

      new App.Views.Home({ collection: App.posts });
    },

    userLogin: function() {

      // Displaying Buttons
      if(App.user) {
        $('.logInBtn').addClass('hide');
        $('.signUpBtn').addClass('hide');
      } else if (!App.user) {
        $('.addBtn').addClass('hide');
        $('.accBtn').addClass('hide');
        $('.logOutBtn').addClass('hide');
      }

      new App.Views.Login();
    },

    userSignup: function() {

      // Displaying Buttons
      if(App.user) {
        $('.logInBtn').addClass('hide');
        $('.signUpBtn').addClass('hide');
      } else if (!App.user) {
        $('.addBtn').addClass('hide');
        $('.accBtn').addClass('hide');
        $('.logOutBtn').addClass('hide');
      }

      new App.Views.Signup();
    },

    userPage: function() {

      if(!App.user) {
        alert('Please log in to access account');
        return App.router.navigate('', {trigger: true});
      }

      // Displaying Buttons
      if(App.user) {
        $('.logInBtn').addClass('hide');
        $('.signUpBtn').addClass('hide');
        $('.logOutBtn').removeClass('hide');
        $('.addBtn').removeClass('hide');
        $('.accBtn').removeClass('hide');
      }

      new App.Views.User({ collection: App.posts });
    },

    addPost: function() {

      if(!App.user) {
        alert('Please log in or sign up to add a post');
        return App.router.navigate('', {trigger: true});
      }

      // Displaying Buttons
      if(App.user) {
        $('.logInBtn').addClass('hide');
        $('.signUpBtn').addClass('hide');
      } else if (!App.user) {
        $('.addBtn').addClass('hide');
        $('.accBtn').addClass('hide');
        $('.logOutBtn').addClass('hide');
      }

      new App.Views.Add();

    },

    editPost: function(info) {

      // Displaying Buttons
      if(App.user) {
        $('.logInBtn').addClass('hide');
        $('.signUpBtn').addClass('hide');
      } else if (!App.user) {
        $('.addBtn').addClass('hide');
        $('.accBtn').addClass('hide');
        $('.logOutBtn').addClass('hide');
      }

      var data = App.posts.get(info);
      new App.Views.Edit({ currentPost: data });
    },

    singlePost: function(info) {

      // Displaying Buttons
      if(App.user) {
        $('.logInBtn').addClass('hide');
        $('.signUpBtn').addClass('hide');
      } else if (!App.user) {
        $('.addBtn').addClass('hide');
        $('.accBtn').addClass('hide');
        $('.logOutBtn').addClass('hide');
      }

      var data = App.posts.get(info);
      new App.Views.Single({ currentPost: data });
    },

    authorPage: function(author) {

      // Displaying Buttons
      if(App.user) {
        $('.logInBtn').addClass('hide');
        $('.signUpBtn').addClass('hide');
      } else if (!App.user) {
        $('.addBtn').addClass('hide');
        $('.accBtn').addClass('hide');
        $('.logOutBtn').addClass('hide');
      }
      // author will only go to the initialize so need this.options to be able to use in post Query on author_view
      new App.Views.Author({ collection: App.posts, authorPosts: author });
    },

    categoryPage: function(category) {

      // Displaying Buttons
      if(App.user) {
        $('.logInBtn').addClass('hide');
        $('.signUpBtn').addClass('hide');
      } else if (!App.user) {
        $('.addBtn').addClass('hide');
        $('.accBtn').addClass('hide');
        $('.logOutBtn').addClass('hide');
      }

      new App.Views.Category({ collection: App.posts, categoryPosts: category });

    }

  });

}());
