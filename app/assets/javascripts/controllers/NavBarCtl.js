function NavBarCtl($scope, $location,$cookies) {
    $scope.navList = [
        { url: '/home', title: 'Home'},
        { url: '/create_post', title: 'New post'},
        { url: '/login', title: 'Login'},
        { url: '/about', title: 'About'}
    ];
    $location.path('/route1');

    function detectRoute() {


        angular.forEach($scope.navList, function(item) {
            item.active = $location.path().match(new RegExp(item.url)) ? true : false;
        });
    }
    $scope.$on('$routeChangeSuccess', detectRoute);
}

NavBarCtl.$inject = ['$scope', '$location','$cookies'];
