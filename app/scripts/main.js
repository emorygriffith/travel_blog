Parse.initialize("CMngAvUucHZIeKalDNfSr9RH0S82H5vSiLMHDc7n", "vRKH6Vuzsq2zAbTzhqcfOtZAaRfD0larKCMLKF0c");

(function() {
  //create a new instance of our collection
  App.posts = new App.Collections.Posts();

  //fetch server-side posts
  App.posts.fetch().done(function() {

    App.router = new App.Routers.AppRouter();

  });

}());
