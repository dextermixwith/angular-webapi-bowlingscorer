'use strict';

(function() {
    var app = angular.module('bowlingScoreCard', []);

    app.controller('ScoreCardController', ['$scope', function($scope) {
        $scope.totalScore = 0;
        $scope.playerName = '';
    }])
})();