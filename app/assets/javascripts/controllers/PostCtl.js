function PostCtl($scope, $http, $location, Post, StorageService, Comment) {
    $scope.currentPost = $scope.currentPost || StorageService.getData('currentPost');


    $scope.allPosts = Post.all();
    $scope.error = null;

    $scope.createPost = function() {
        var attr,newPost;
        attr = {};
        attr.title = $scope.newPost.title;
        attr.text_data = $scope.newPost.textData;
        newPost = Post.create(attr);
        StorageService.addData('currentPost',newPost);


    };


    $scope.deletePost = function(Id,idx){
        Post.delete(Id);
        $scope.allPosts.splice(idx, 1);
    };

    $scope.openPost = function(Id){
        var post = Post.get(Id);
        StorageService.addData('currentPost',post);
        $location.path('/post');
    };

    $scope.createComment = function(postId){
        var comment = Comment.create(postId,$scope.newComment.textData);
        $scope.currentPost.comments.push(comment);
    };

}

PostCtl.$inject = ['$scope', '$http', '$location','Post','StorageService','Comment'];
