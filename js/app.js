'use strict';

(function() {
    var app = angular.module('bowlingScoreCard', []);

    var Turn = function() {
        this.rollScores = ['-', '-'];
        this.score = '0';  
    };
 
    app.controller('ScoreCardController', ['$scope', function($scope) {
        $scope.totalScore = 0;
        $scope.playerName = '';
       
        $scope.turns = [];
        
        function recalculatelScores () {
            $scope.totalScore = 0;
           
            for(var turnIndex = 0; turnIndex < $scope.turns.length; turnIndex++){
                
                $scope.turns[turnIndex].score = '0';
                
                var turnComplete = false;
                var turnScoreValue = 0;
                
                for(var rollIndex = 0; rollIndex < $scope.turns[turnIndex].rollScores.length && !turnComplete; rollIndex++) {
                    var rollScore = $scope.turns[turnIndex].rollScores[rollIndex];
                    
                    if(rollScore != '-') {                        
                        turnScoreValue += new Number(rollScore);
                        turnComplete = turnIndex == 9 ? rollIndex == ($scope.turns[turnIndex].rollScores.length - 1) : (rollIndex > 0);
                    }
                }
                
                if (turnComplete && turnScoreValue == 10){
                    $scope.turns[turnIndex].score = '/';
                } else if (turnComplete){
                    $scope.totalScore += turnScoreValue; 
                    $scope.turns[turnIndex].score = turnScoreValue >= 10 && turnIndex == 9 ? '/' : new String(turnScoreValue);
                }
                
                var previousSpare = (turnIndex > 0) && ($scope.turns[turnIndex - 1].score == '/');
                
                if(previousSpare) {
                    $scope.totalScore += 10 + new Number($scope.turns[turnIndex - 1].rollScores[0]);
                }                
            }
        };
        
        function addScoreToTurnRoll(turn, roll, score) {
           while($scope.turns.length < turn + 1){
               $scope.turns.push(new Turn());
            }
            $scope.turns[turn].rollScores[roll] = score;
        }
        
        $scope.enterPlayerScore = function(turn, roll, score) {
            addScoreToTurnRoll(turn, roll, score);
            recalculatelScores();
        };
    
    }]);
})();