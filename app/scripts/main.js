Parse.initialize("Cy0plLtPINgE6OY44gN25GO8Abl47gJsFKSguX7R", "kCbQ0Gurt0jBLCu7pC8PygcKidnfFZhph52Rgwfg");
(function() {

  //create obj to store current user - don't need here added it to App.updateUser function
  // App.user = Parse.User.current();

  //create a new instance of our collection
  App.posts = new App.Collections.Posts();

  //fetch server-side posts
  App.posts.fetch().done(function() {

    App.router = new App.Routers.AppRouter();
    Parse.history.start();

  });

  // Log Out
  $('#logOut').on('click', function (e) {
    e.preventDefault();
    Parse.User.logOut();
    App.updateUser();
    App.router.navigate('', {trigger: true});
  });


  // Update User
  App.updateUser = function (){
    App.user = Parse.User.current();
    var currentUser;
    if (App.user == null){
      currentUser = '';
    } else {
      currentUser = 'Welcome ' + App.user.attributes.username;
    }
    $('#welcomeText').html(currentUser);
  };
  App.updateUser();

}());
