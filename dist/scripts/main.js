(function () {

  App.Models.Post = Parse.Object.extend({

    className: 'Post',

    idAttribute: 'objectId',

    defaults: {
      title: '',
      content: '',
      category: '',
      published: false,
      image: ''
    },

    initialize: function(){
      //var t = this.get('title');
      //console.log(t + ' has been added');
    }

  });

}());

(function () {

  App.Models.Comment = Parse.Object.extend({

    className: 'Comments',
    idAttribute: 'objectId',

    defaults: {
      commentText: '',
      commentAuthor: ''
    },

    initialize: function() {

    }

  });


}());

(function() {

  App.Collections.Posts = Parse.Collection.extend({

    model: App.Models.Post,

  });

}());

(function() {

  App.Views.Home = Parse.View.extend({

    tagName: 'ul',
    className: 'allPosts',

    events: {},

    template: _.template($('#postTemp').html()),

    initialize: function(options) {
      this.options = options;

      this.collection.off();
      this.collection.on('sync', this.postQuery, this);

      $('#blogPosts').html(this.$el);

      this.postQuery();

    },

    postQuery: function() {

      var self = this;

      var all_posts = new Parse.Query(App.Models.Post);

      all_posts.find({
        success: function (results) {
          self.collection = results;
          self.render();
        }
      });

    },

    render: function() {

      var self = this;

      this.$el.empty();

      _.each(App.posts.models, function(p) {
        if(p.attributes.published === true) {
          self.$el.append(self.template(p.toJSON()));
        }

      });

      return this;

    }


  });


}());

(function() {

  App.Views.Signup = Parse.View.extend({

    tagName: 'div',
    className: 'signupArea',

    events: {
      'submit #signUp': 'signingUp'
    },

    template: _.template($('#signupForm').html()),

    initialize: function() {
      this.render();

      $('#blogPosts').html(this.$el);

    },

    render: function() {

      this.$el.html(this.template);

    },

    signingUp: function (e) {
      e.preventDefault();

      var person = new Parse.User({

        username: $('#username').val(),
        password: $('#password').val()
      });

      console.log(person);


      person.signUp();

      App.router.navigate('', {trigger: true});

    }



  });



}());

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

(function() {

  App.Views.User = Parse.View.extend({

    tagName: 'ul',
    className: 'myPosts',

    events: {},

    template: _.template($('#userTemp').html()),

    initialize: function(options) {
      this.options = options;

      this.collection.off();
      this.collection.on('sync', this.postQuery, this);

      $('#blogPosts').html(this.$el);

      this.postQuery();

    },

    postQuery: function() {

      var self = this;

      var user_post = new Parse.Query(App.Models.Post);

      user_post.equalTo('user', App.user);

      user_post.find({
        success: function (results) {
          self.collection = results;
          self.render();
        }
      });

    },

    render: function() {

      var self = this;

      this.$el.empty();

      _.each(self.collection, function(p) {
        self.$el.append(self.template(p.toJSON()));
        if(p.attributes.published === true) {
          $('#textDraft').remove();
        }

      });

      return this;

    }


  });


}());

(function() {

  App.Views.Add = Parse.View.extend({

    tagName: 'div',
    className: 'addPost',

    events: {
      'click #publishPost' : 'publishNewPost',
      'click #draftPost': 'draftNewPost'
    },

    initialize: function() {

      this.render();

      $('#addForm').empty();

      $('#blogPosts').html(this.$el);

    },

    render: function() {

    

      this.$el.empty();

      this.$el.html($('#addTemp').html());

    },

    publishNewPost: function(e) {
      e.preventDefault();

      var p = new App.Models.Post({
        title: $('#post_title').val(),
        content: $('#post_content').val(),
        category: $('input[name="category"]:checked').val(),
        published: true,
        image: $('input').val(),
        user: App.user,
        author: App.user.attributes.username,
        authorId: App.user.id
      });

      var postACL = new Parse.ACL(Parse.User.current());

      postACL.setPublicReadAccess(true);

      p.setACL(postACL);

      p.save(null, {
        success: function() {
          App.posts.add(p);
          App.router.navigate('user', {trigger:true});
        }
      });

    },

    draftNewPost: function(e) {
      e.preventDefault();

      var p = new App.Models.Post({
        title: $('#post_title').val(),
        content: $('#post_content').val(),
        category: $('input[name="category"]:checked').val(),
        user: App.user
      });

      var postACL = new Parse.ACL(Parse.User.current());

      postACL.setPublicReadAccess(true);

      p.setACL(postACL);

      p.save(null, {
        success: function() {
          App.posts.add(p);
          App.router.navigate('user', {trigger:true});
        }
      });

    }


  });


}());

(function() {

  App.Views.Edit = Parse.View.extend({

    tagName: 'div',
    className: 'editPost',

    events: {
      'click #updatePubPost' : 'updatePubPost',
      'click #updateDraftPost' : 'updateDraftPost',
      'click #delete' : 'deletePost'
    },

    template: _.template($('#editTemp').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

      $('#editForm').empty();

      $('#blogPosts').html(this.$el);

    },

    render: function() {

      this.$el.empty();

      this.$el.html(this.template(this.options.currentPost.toJSON()));

    },

    updatePubPost: function(e) {
      console.log(e);
      e.preventDefault();

      this.options.currentPost.set({
          title: $('#update_post_title').val(),
          content: $('#update_post_content').val(),
          category: $('input[name="category"]:checked').val(),
          published: true,
          author: App.user.attributes.username,
          authorId: App.user.id
      });

      this.options.currentPost.attributes.published = false;

      this.options.currentPost.save();

      App.router.navigate('user', { trigger: true });

    },

    updateDraftPost: function(e) {
      e.preventDefault();

      this.options.currentPost.set({
          title: $('#update_post_title').val(),
          content: $('#update_post_content').val(),
          category: $('input[name="category"]:checked').val(),
          author: App.user.attributes.username,
          authorId: App.user.id
      });

      this.options.currentPost.save();

      App.router.navigate('user', { trigger: true });


    },

    deletePost: function(e) {
      e.preventDefault();

      this.options.currentPost.destroy();

      App.router.navigate('user', {trigger: true});
    }


  });


}());

(function() {

  App.Views.Single = Parse.View.extend({

    tagName: 'div',
    className: 'singlePost',

    events: {
      'submit #addComment' : 'addComment'

    },

    template: _.template($('#singleTemp').html()),

    initialize: function(options) {
      this.options = options;
      this.render();

      $('#blogPosts').html(this.$el);

    },

    render: function() {

      this.$el.empty();

      this.$el.html(this.template(this.options.currentPost.toJSON()));

      var commentTemplate = _.template($('#commentTemp').html());
      var comments_query = new Parse.Query(App.Models.Comment);
      comments_query.equalTo('parent', this.options.currentPost);

      this.$el.append('<h2>Comments</h2><ul class="comments"></ul>');

      comments_query.find({
        success: function (results) {

          _.each(results, function(comment) {
            $('ul.comments').append(commentTemplate(comment.toJSON()));
          });
        }
      });

    },

    addComment: function (e) {
      e.preventDefault();

      var comment = new App.Models.Comment({

        commentText: $('#commentText').val(),
        commentAuthor: $('#commentAuthor').val(),
         parent: this.options.currentPost

      });
      console.log(comment);
      comment.save(null, {

        success: function () {

            $('#addComment')[0].reset();
        }

      });

      this.render();

    }

  });

}());

(function() {

  App.Views.Author = Parse.View.extend({

    tagName: 'ul',
    className: 'authorPosts',

    events: {},

    template: _.template($('#authorTemp').html()),

    initialize: function(options) {
      this.options = options;

      this.collection.off();
      this.collection.on('sync', this.postQuery, this);

      $('#blogPosts').html(this.$el);

      this.postQuery();

    },

    postQuery: function() {

      var self = this;

      var author_posts = new Parse.Query(App.Models.Post);

      console.log(author_posts);

      // author_posts.equalTo('author', 'author');

      author_posts.findWhere(a) ({
        success: function (results) {
          self.collection = results;
          self.render();
        }
      });

    },

    render: function() {

      var self = this;

      this.$el.empty();

      _.each(self.collection, function(p) {
        self.$el.append(self.template(p.toJSON()));
      });

      return this;

    }


  });


}());

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
      'author/:id' : 'authorPage'

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

    authorPage: function() {

      // Displaying Buttons
      if(App.user) {
        $('.logInBtn').addClass('hide');
        $('.signUpBtn').addClass('hide');
      } else if (!App.user) {
        $('.addBtn').addClass('hide');
        $('.accBtn').addClass('hide');
        $('.logOutBtn').addClass('hide');
      }

      new App.Views.Author({ collection: App.posts });
    },

  });

}());

Parse.initialize("CMngAvUucHZIeKalDNfSr9RH0S82H5vSiLMHDc7n", "vRKH6Vuzsq2zAbTzhqcfOtZAaRfD0larKCMLKF0c");

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
