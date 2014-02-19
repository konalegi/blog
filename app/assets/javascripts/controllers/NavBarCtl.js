function NavBarCtl($scope, $location,Session) {
    var isAuth = function(){
        if (Session.isAuthenticated()){

            return "Logout";
        }else{
            return "Login";
        }
    };

    $scope.navList = [
        { url: '/home', title: 'Home'},
        { url: '/create_post', title: 'New post'},
        { url: '/login', title:  isAuth() },
        { url: '/about', title: 'About'}
    ];



    function detectRoute() {

        angular.forEach($scope.navList, function(item) {
            if (item.url=='/login'){
                item.title=isAuth();
            }
            item.active = $location.path().match(new RegExp(item.url)) ? true : false;
        });
    }
    $scope.$on('$routeChangeSuccess', detectRoute);
}

NavBarCtl.$inject = ['$scope', '$location','Session'];
