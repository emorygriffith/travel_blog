Parse.initialize("quVobZrT2EJi8b7fHIHdmAenegGjnU7ViRjWvNOv", "mh4tvRohGaBDuCTbCmEhZco6BFe7Z4kSBammGwzo");

(function() {
  //create a new instance of our collection
  App.posts = new App.Collections.Posts();

  //fetch server-side posts
  App.posts.fetch().done( function() {

    App.router = new App.Routers.AppRouter();

  });

}());
