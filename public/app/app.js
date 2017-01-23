var app = angular.module('myApp', []);

app.controller('myController', function($scope, AuthService) {
    console.log('In CTRL');
    $scope.submitForm = function() {
        //console.log($scope.login);
        //console.log(AuthService.checkAuth($scope.login));
        AuthService.checkAuth($scope.login).then(function(data) {
                console.log(data);
                if (data.msg === 'Success') {
                    $scope.token = data.token;
                    //console.log($scope.token);
                } else if (!data.status) {
                    $scope.error = data.msg;

                }
            })
            //console.log($scope.value);
    }

})
