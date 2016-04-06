'use strict';

(function() {
    var app = angular.module('bowlingScoreCard', []);

    app.controller('ScoreCardController', ['$scope', function($scope) {
        $scope.totalScore = 0;
        $scope.playerName = '';
        $scope.rollScores = [];

        function recalculateTotalScore () {
            $scope.totalScore = 0;
            for(var i = 0; i < $scope.rollScores.length; i++) {
                $scope.totalScore += $scope.rollScores[i];
            }
        };
        
        $scope.enterPlayerScore = function(roll, score) {
            $scope.rollScores[roll - 1] = score;
            recalculateTotalScore();
        };
    
    }]);
})();