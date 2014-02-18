function HomeCtl($scope, $http, $location,Post) {
    $scope.posts = Post.all();
}

HomeCtl.$inject = ['$scope', '$http', '$location','Post'];
