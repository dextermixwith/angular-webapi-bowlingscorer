'use strict';

app.controller('ScoreCardController', ['$scope', 'scoreCard', function($scope, scoreCard) {
    
    $scope.scoreCard = scoreCard;
    $scope.errorMessage = "";
    
    $scope.enterPlayerScore = function(playerNumber, frame, tryNumber, score) {
        if (score !== "") {
            try {
                $scope.scoreCard.addScoreToFrame(playerNumber, frame, tryNumber, score);
                $scope.errorMessage = "";
            } catch (error) {
                $scope.errorMessage = error.message;  
            }
        }
    };
    
    $scope.selectTryScore = function ($event) {
        $event.target.select();
    };
    
    $scope.addPlayer = function() {
        $scope.scoreCard.addPlayerRow();  
    };

}]);