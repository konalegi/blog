function InitCtl($scope,Session) {

    $scope.init = function () {
        Session.requestCurrentUser();
    };

}

InitCtl.$inject = ['$scope', 'Session'];
