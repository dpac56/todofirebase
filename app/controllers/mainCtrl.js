(function(){

  //variables initiated not in controller
  var oneWeekInEpoch = 604800000;

  //controller starts
  var mainCtrl = function($scope, $firebase, $window, $firebaseSimpleLogin){

    var ref = new $window.Firebase('https://todo7.firebaseio.com/list');
    var sync = $firebase(ref);
    var authClient = $firebaseSimpleLogin(ref);
    $scope.login = function () {
      ref.authWithPassword({
        email    : $scope.username,
        password : $scope.password
      }, function(error, authData) {
        if (error === null) {
          // user authenticated with Firebase
          console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
        } else {
          console.log("Error authenticating user:", error);
        }
      });

    }


    $scope.todos = sync.$asArray();

    $scope.addTodo = function(){

      var dateWhenItemAdded = Date.now();

      var newTodoItem = new TodoItem($scope.newItem, dateWhenItemAdded, oneWeekInEpoch);

      $scope.todos.$add(newTodoItem);

      $scope.newItem = '';
    };

    $scope.deleteTodo = function($index){
      $scope.todos.$remove($index);
    };

    $scope.isCurrent = function (todo) {
      return (Date.now() - todo.date < 604800000);
    };

    $scope.daysLeft = function (todo) {
      return 7-((Date.now() - todo.date)/86400000);
    };


  };

  mainCtrl.$inject = ['$scope', '$firebase', '$window', '$firebaseSimpleLogin'];

  angular.module('todoApp')
  .controller('mainCtrl', mainCtrl);

}());
