angular.module('karma', []);

angular.module('karma')
       .controller('karmaController', function ($scope) {
          $scope.num1 = 0;
          $scope.num2 = 0;
          $scope.sum = 0;
          
          $scope.AddNumbers = function() {
              $scope.sum = $scope.num1*1 + $scope.num2;
          };
       });