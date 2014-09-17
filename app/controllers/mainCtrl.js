(function(){

  //variables initiated not in controller
  var oneWeekInEpoch = 604800000;
  
  function TodoItem(item, date) {
    this.item = item;
    this.date = date;
    this.daysLeft = function () {
      return (7-(Date.now() - this.date)/(1000*24*60*60));
    };
  }

  //controller starts
  var mainCtrl = function($scope){
    $scope.todos = [
      new TodoItem("Item 1", 1310763878804),
      new TodoItem("Item 2", 1410763878804),
      //Another way to add items
      //{item: "Item 3", date: 1410763878804, daysLeft: function () { return (7-(Date.now() - this.date)/(1000*24*60*60))}},
      ];

    $scope.dateNow = Date.now();

    $scope.addTodo = function(){

        var dateWhenItemAdded = Date.now();

        $scope.todos.push(new TodoItem($scope.newItem, dateWhenItemAdded));

        $scope.newItem = '';
      };

    $scope.deleteTodo = function($index){
        $scope.todos.splice($index, 1);
      };

    $scope.itemStatus = function($index){
        if ($scope.dateNow - $scope.todos[$index].date < oneWeekInEpoch){
          return true;
        } else {
          return false;
        }
      };

    };



  mainCtrl.$inject = ['$scope'];

  angular.module('todoApp')
    .controller('mainCtrl', mainCtrl);

}());