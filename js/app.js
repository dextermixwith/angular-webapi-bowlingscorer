'use strict';

(function() {
    var app = angular.module('bowlingScoreCard', []);

    var Turn = function() {
        this.rollScores = [];
        this.score = '0';  
    };

    app.controller('ScoreCardController', ['$scope', function($scope) {
        $scope.totalScore = 0;
        $scope.playerName = '';
        $scope.rollScores = [];
        $scope.turns = [ ];

        function recalculateTotalScore () {
            $scope.totalScore = 0;
            
            for(var turnIndex = 0; turnIndex < $scope.turns.length; turnIndex++){
                var turnScoreValue = 0;
                for(var rollIndex = 0; rollIndex < $scope.turns[turnIndex].rollScores.length; rollIndex++) {
                    var rollScoreValue = new Number($scope.turns[turnIndex].rollScores[rollIndex]);
                    $scope.totalScore += rollScoreValue;
                    turnScoreValue += rollScoreValue;
                }
                $scope.turns[turnIndex].score = new String(turnScoreValue);    
            }
        };
        
        function addScoreToTurnRoll(turn, roll, score) {
           while($scope.turns.length < turn + 1){
               $scope.turns.push(new Turn());
            }
            while($scope.turns[turn].rollScores.length < roll + 1){
                $scope.turns[turn].rollScores.push('0');
            }
            $scope.turns[turn].rollScores[roll] = score;
        }
        
        $scope.enterPlayerScore = function(turn, roll, score) {
            addScoreToTurnRoll(turn, roll, score);
            recalculateTotalScore();
        };
    
    }]);
})();