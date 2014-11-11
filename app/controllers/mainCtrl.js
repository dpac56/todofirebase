(function(){

  //variables initiated not in controller
  var oneWeekInEpoch = 604800000;
  function TodoItem(item, date, timeLimit) {
    this.item = item;
    this.date = date;
    this.timeLimit = timeLimit;
  }

  TodoItem.prototype.daysLeft = function () {
    return (7-(Date.now() - this.date)/(1000*24*60*60));
  };
  TodoItem.prototype.isCurrent = function(){
    return Date.now() - this.date < this.timeLimit;
  };

  //controller starts
  var mainCtrl = function($scope, $firebase){

    var ref = new Firebase("https://todo7.firebaseio.com/list");
    var sync = $firebase(ref);
    $scope.todos = sync.$asArray();


    // $scope.todos = [
    //   new TodoItem("Item 1", 1310763878804, oneWeekInEpoch),
    //   new TodoItem("Item 2", 1410763878804, oneWeekInEpoch),
    //   //Another way to add items
    //   //{item: "Item 3", date: 1410763878804, daysLeft: function () { return (7-(Date.now() - this.date)/(1000*24*60*60))}},
    //   ];

    //$scope.dateNow = Date.now();

    $scope.addTodo = function(){

        var dateWhenItemAdded = Date.now();

        var newTodoItem = new TodoItem($scope.newItem, dateWhenItemAdded, oneWeekInEpoch)

        // $scope.todos.push(new TodoItem($scope.newItem, dateWhenItemAdded, oneWeekInEpoch));

        $scope.todos.$add(newTodoItem);

        $scope.newItem = '';
      };

    $scope.deleteTodo = function($index){
        $scope.todos.$remove($index);
      };



    };

  mainCtrl.$inject = ['$scope', '$firebase'];

  angular.module('todoApp')
    .controller('mainCtrl', mainCtrl);

}());
