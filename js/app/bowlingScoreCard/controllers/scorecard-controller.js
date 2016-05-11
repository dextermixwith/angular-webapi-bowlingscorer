'use strict';

app.controller('ScoreCardController', ['$scope', 'scoreCard', function($scope, scoreCard) {
    
    $scope.scoreCard = scoreCard;
    
    $scope.enterPlayerScore = function(frame, tryNumber, score) {
        $scope.scoreCard.addScoreToFrame(frame, tryNumber, score);
    };

}]);