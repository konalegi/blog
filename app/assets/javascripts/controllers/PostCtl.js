function PostCtl($scope, $location, Post, StorageService, Comment,Session) {
    $scope.post = $scope.post || StorageService.getData('currentPost');
    $scope.isAuth = Session.isAuthenticated();
    $scope.opennedForEdit = StorageService.getData('opennedForEdit');
    console.log("opennedforEdit: "+ $scope.opennedForEdit);
    $scope.currentUser = Session.currentUser;

    $scope.allPosts = Post.all();
    $scope.error = null;

    $scope.createPost = function() {
        var attr,newPost;
        attr = {};
        attr.title = $scope.post.title;
        attr.text_data = $scope.post.text_data;
        newPost = Post.create(attr);
        console.log(newPost);
        newPost.$promise.then(function(data){
           if (data.id){
               StorageService.addData('currentPost',data);
               $scope.openPost(data.id);
           }
        },function(response){
            $scope.error = response.data.errors;
            $scope.$digest.apply();
        });

    };
    $scope.deletePost = function(Id,idx){
        Post.delete(Id);
        $scope.allPosts.splice(idx, 1);
    };

    $scope.deleteComment = function(Id,idx){
        Comment.delete(Id);
        $scope.post.comments.splice(idx, 1);
    };

    $scope.updatePost = function(){
        Post.update($scope.post.id,$scope.post.title,$scope.post.text_data);
    }


    $scope.openPost = function(Id){
        var post = Post.get(Id);
        StorageService.addData('currentPost',post);
        $location.path('/post');
    };

    $scope.viewPost = function(Id){
        openPost(Id,false);
    };

    $scope.editPost = function(Id){
        openPost(Id,true);
    };

    var openPost = function(Id,forEdit){
        var post = Post.get(Id);
        StorageService.addData('currentPost',post);

        StorageService.addData('opennedForEdit',forEdit);


        if (forEdit){
            $location.path('/create_post');
        }else{
            $location.path('/post');
        }
    };

    $scope.createComment = function(){
        var comment = Comment.create($scope.post.id,$scope.newComment.textData);
        $scope.post.comments.push(comment);
    };

}

PostCtl.$inject = ['$scope', '$location','Post','StorageService','Comment','Session'];
