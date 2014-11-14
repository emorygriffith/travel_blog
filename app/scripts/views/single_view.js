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
          })

        }
      })

    },

    addComment: function (e) {
      e.preventDefault();

      var comment = new App.Models.Comment({

        commentText: $('#commentText').val(),
         parent: this.options.currentPost

      });

      comment.save(null, {

        success: function () {


          // App.router.navigate('read/:postID', {trigger: true});
            $('#addComment')[0].reset();
            // location.reload();

        }

      });
          this.render();
    }
  });
}());
