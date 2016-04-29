'use strict';

var app = angular.module('bowlingScoreCard', []);

var Frame = function() {
    this.tryScores = ['-', '-'];
    this.score = '0'; 
    this.scoreValue = 0; 
};

app.factory('scoreParser', function() {
    return  {
        toInt : function(tryScore) {
        if (tryScore === '-') {
            return 0;
        }
        return tryScore === 'X' ? 10 : parseInt(tryScore);    
        }
    }
});

app.controller('ScoreCardController', ['$scope', 'scoreParser', function($scope, scoreParser) {
    $scope.totalScore = 0;
    $scope.playerName = '';
    
    $scope.frames = [];   
    
    function recalculatelScores () {
        $scope.totalScore = 0;
        
        for(var frameIndex = 0; frameIndex < $scope.frames.length; frameIndex++){
            
            var frameComplete = false;
            var frameScoreValue = 0;
            
            for(var tryIndex = 0; tryIndex < $scope.frames[frameIndex].tryScores.length && !frameComplete; tryIndex++) {
                var tryScore = $scope.frames[frameIndex].tryScores[tryIndex];
                
                if(tryScore !== '-') {                        
                    frameScoreValue += scoreParser.toInt(tryScore);
                    frameComplete = frameIndex === 9 ? tryIndex === ($scope.frames[frameIndex].tryScores.length - 1) : (tryIndex > 0);
                }
            }
            
            if (frameComplete && frameScoreValue === 10){
                $scope.frames[frameIndex].score = '/';
            } else if (!frameComplete && frameScoreValue === 10){
                $scope.frames[frameIndex].score = 'X';
            } else if (frameComplete){
                $scope.totalScore += frameScoreValue; 
                $scope.frames[frameIndex].score = frameScoreValue >= 10 && frameIndex === 9 ? '/' : frameScoreValue.toString();
            } 
        
            var previousSpare = (frameIndex > 0) && ($scope.frames[frameIndex - 1].score === '/');
            
            if(previousSpare) {
                var previousSpareScore = 10 + scoreParser.toInt($scope.frames[frameIndex].tryScores[0]);
                $scope.frames[frameIndex - 1].scoreValue += previousSpareScore;
                $scope.frames[frameIndex].scoreValue += previousSpareScore;
                $scope.totalScore += previousSpareScore;
            }  

            var previousStrike = (frameIndex > 1) && $scope.frames[frameIndex - 2].score === 'X' && ($scope.frames[frameIndex].tryScores[1] !== '-' || $scope.frames[frameIndex].tryScores[0] === 'X');
            
            if(previousStrike) {
                var previousStrikeScore = 10 + scoreParser.toInt($scope.frames[frameIndex].tryScores[0])  + scoreParser.toInt($scope.frames[frameIndex].tryScores[1]) + scoreParser.toInt($scope.frames[frameIndex - 1].tryScores[0]) + scoreParser.toInt($scope.frames[frameIndex - 1].tryScores[1]);
                $scope.totalScore += previousStrikeScore;                    
                $scope.frames[frameIndex - 2].scoreValue += previousStrikeScore;
                $scope.frames[frameIndex - 1].scoreValue += previousStrikeScore;
                $scope.frames[frameIndex].scoreValue += previousStrikeScore;
            }

            
            if (frameIndex === 9 && $scope.frames[frameIndex].tryScores[0] === 'X') {
                $scope.totalScore += scoreParser.toInt($scope.frames[frameIndex].tryScores[1]) + scoreParser.toInt($scope.frames[frameIndex].tryScores[2]) ;
            }  
                            
            $scope.frames[frameIndex].scoreValue = $scope.totalScore;
            
        }
    }
    
    function addScoreToFrame(frame, tryNumber, score) {
        while($scope.frames.length < frame + 1){
            $scope.frames.push(new Frame());
        }
        $scope.frames[frame].tryScores[tryNumber] = score;
    }
    
    $scope.enterPlayerScore = function(frame, tryNumber, score) {
        addScoreToFrame(frame, tryNumber, score);
        recalculatelScores();
    };

}]);