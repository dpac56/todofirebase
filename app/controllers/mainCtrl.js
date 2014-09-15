(function(){

  //variables initiated not in controller
  //var oneWeekInEpoch = 604800;
  var dateNow = Date.now();

  //controller starts
  var mainCtrl = function($scope){
    $scope.todos = [
      {item: "Item 1", date: 1410763878804, status: true},
      {item: "Item 2", date: 1410763878804, status: false}
      ];

    //To be deleted
    $scope.testing = $scope.todos[1].status;
    //To be deleted

    
    $scope.addTodo = function(){

        var dateWhenItemAdded = Date.now();

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
        //return $scope.todos[$index].status;
        if (dateNow - $scope.todos[$index].date < 604800 ){
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