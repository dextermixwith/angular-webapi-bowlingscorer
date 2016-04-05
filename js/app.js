'use strict';

(function() {
    var app = angular.module('bowlingScoreCard', []);

    app.controller('ScoreCardController', ['$scope', function($scope) {
        $scope.totalScore = 0;
        $scope.playerName = '';
        $scope.rollScores = [0, 0];
        $scope.enterPlayerScore = function(roll, score) {
            $scope.rollScores[roll - 1] = score;
            $scope.totalScore = $scope.rollScores[0] + $scope.rollScores[1];
        };
    }]);
})();