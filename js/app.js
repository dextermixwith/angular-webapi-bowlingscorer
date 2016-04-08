'use strict';

(function() {
    var app = angular.module('bowlingScoreCard', []);

    var Turn = function() {
        this.rollScores = ['-', '-', '-'];
        this.score = '0';  
    };

    app.controller('ScoreCardController', ['$scope', function($scope) {
        $scope.totalScore = 0;
        $scope.playerName = '';
        //$scope.turns = [ new Turn(), new Turn(), new Turn(), new Turn(), new Turn(), new Turn(), new Turn(), new Turn(), new Turn(), new Turn()];

        $scope.turns = [];
        
        function recalculatelScores () {
            $scope.totalScore = 0;
            var spareScore = false;
            for(var turnIndex = 0; turnIndex < $scope.turns.length; turnIndex++){
                var turnScoreValue = 0;
                for(var rollIndex = 0; rollIndex < $scope.turns[turnIndex].rollScores.length; rollIndex++) {
                    var rollScore = $scope.turns[turnIndex].rollScores[rollIndex];
                    if(rollScore != '-') {
                        turnScoreValue += new Number(rollScore);
                    }
                    //console.log('turnIndex = ' + turnIndex + ' rollIndex = ' + rollIndex + ' rollScore = ' + rollScore + ' turnScoreValue = ' + turnScoreValue);
                }
    
                if (turnScoreValue == 10){
                    spareScore = true;
                    $scope.turns[turnIndex].score = '/';
                    $scope.totalScore += 10;
                } else {
                    $scope.turns[turnIndex].score = new String(turnScoreValue);   
                    $scope.totalScore += turnScoreValue; 
                    if(spareScore) {
                        $scope.totalScore += new Number($scope.turns[turnIndex].rollScores[0]);
                    }
                    spareScore = false;
                }
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
            recalculatelScores();
        };
    
    }]);
})();