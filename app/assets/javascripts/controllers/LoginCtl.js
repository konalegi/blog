function LoginCtl($scope, $http, $location,Session) {

    if (Session.isAuthenticated()){
        Session.logout();

    }

    $scope.error = null;

    $scope.login = function() {
        Session.login($scope.email,$scope.password,function(status,response){
            if (!status){
                $scope.error=response.data.error;
            }
        });

    };

    $scope.singup = function(){
        $location.path('register');
    };

    $scope.register = function(){
      Session.register($scope.name,$scope.surname,$scope.birthdate,$scope.sex,$scope.email,$scope.password,$scope.password_confirmation);
    };
}

LoginCtl.$inject = ['$scope', '$http', '$location','Session'];
