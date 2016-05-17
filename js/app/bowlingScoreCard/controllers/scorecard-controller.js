'use strict';

app.controller('ScoreCardController', ['$scope', 'scoreCard', function($scope, scoreCard) {
    
    $scope.scoreCard = scoreCard;
    $scope.errorMessage = "";
    
    $scope.enterPlayerScore = function(frame, tryNumber, score) {
        if (score !== "") {
            try {
                $scope.scoreCard.addScoreToFrame(frame, tryNumber, score);
                $scope.errorMessage = "";
            } catch (error) {
                $scope.errorMessage = error.message + " : " + score;  
            }
        }
    };
    
    $scope.selectTryScore = function ($event) {
        $event.target.select();
    };

}]);