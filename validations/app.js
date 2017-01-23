const app = angular.module('myApp',[]);

app.controller('myController',function($scope){

  $scope.submitForm = function(){
      console.log($scope.login);
  }


})
