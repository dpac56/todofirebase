(function(){

  var mainCtrl = function($scope){
    $scope.todos = [
      {item: "Item 1", date: "today"},
      {item: "Item 2", date: "tomorrow"}
      ];

    
    $scope.addTodo = function(){

        var dateWhenItemAdded = new Date();

        $scope.todos.push({
          item: $scope.newItem,
          date: dateWhenItemAdded
        });

        $scope.newItem = '';
      };

    $scope.deleteTodo = function($index){
        $scope.todos.splice($index, 1);
      };

    $scope.itemStatus = function($index){
      var currentDate = new Date();
      
    };

    };



  mainCtrl.$inject = ['$scope'];

  angular.module('todoApp')
    .controller('mainCtrl', mainCtrl);

}());