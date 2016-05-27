'use strict';

var app = angular.module('bowlingScorer', ['angular-confirm', 'ui.bootstrap.tpls']);

var Frame = function() {
    this.tryScores = ['-', '-'];
    this.score = '-'; 
    this.scoreValue = 0; 
};

var PlayerScoreRow = function(playerName) {
    var framesArray = [];
    for (var frameIndex = 0; frameIndex < 10; frameIndex++) {
        framesArray.push(new Frame());
    }
    framesArray[9].tryScores.push('-');
    
    this.playerName = playerName || '';
    this.totalScore = 0;
    this.frames = framesArray;  
};
app.controller('ScoreCardController', ['$scope', '$confirm', 'scoreCard', function($scope, $confirm, scoreCard) {
    
    $scope.scoreCard = scoreCard;
    $scope.errorMessage = '';
    $scope.gameStarted = false;
    
    $scope.enterPlayerScore = function(playerNumber, frame, tryNumber, score) {
        if (score !== '') {
            try {
                $scope.scoreCard.addScoreToFrame(playerNumber, frame, tryNumber, score);
                $scope.gameStarted = true;
                $scope.errorMessage = '';
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
    
    $scope.confirmNewGame = function() {
        $confirm({ text : 'Are you want to start a new game? All score data will be lost from the current game.', title : 'New Game', ok: 'Yes', cancel : 'No'})
            .then(function() {
                $scope.newGame();                   
            });
    };
    
    $scope.newGame = function() {
        $scope.scoreCard.clearScoreCard();
        $scope.gameStarted = false;       
    };
}]);
app.factory('scoreCalculator', ['scoreParser', function(scoreParser){
   return {
       recalculateScores : function(playerScoreRow) {
            playerScoreRow.totalScore = 0;

            for(var frameIndex = 0; frameIndex < playerScoreRow.frames.length; frameIndex++){
               if (playerScoreRow.frames[frameIndex].tryScores[0] !== '-') { 
                    var frameComplete = false;
                    var frameScoreValue = 0;
                    
                    for(var tryIndex = 0; tryIndex < playerScoreRow.frames[frameIndex].tryScores.length && !frameComplete; tryIndex++) {
                        var tryScore = playerScoreRow.frames[frameIndex].tryScores[tryIndex];
                        
                        if(tryScore !== '-') {
                            if (tryScore === '/' && tryIndex === 1) {
                                tryScore = (10 - parseInt(playerScoreRow.frames[frameIndex].tryScores[0])).toString();
                                frameScoreValue = 10;
                            } else {
                                frameScoreValue += scoreParser.toInt(tryScore);
                            }                        
    
                            frameComplete = frameIndex === 9 ? tryIndex === (playerScoreRow.frames[frameIndex].tryScores.length - 1) : (tryIndex > 0);
                        }
                        
                        if(tryIndex === 1 && frameScoreValue > 10 && !(frameIndex === 9 && tryScore === 'X')) {
                            throw(new Error('Total try scores entered for frames 1 to 9 cannot come to more than 10'));
                        }                    
                    }
                    
                    if (frameComplete && frameScoreValue === 10){
                        playerScoreRow.frames[frameIndex].score = '/';
                    } else if (!frameComplete && frameScoreValue === 10){
                        playerScoreRow.frames[frameIndex].score = 'X';
                    } else if (frameComplete){
                        playerScoreRow.totalScore += frameScoreValue; 
                        playerScoreRow.frames[frameIndex].score = frameScoreValue === 10 && frameIndex === 9 ? '/' : frameScoreValue.toString();
                    } 

                    var previousSpare = (frameIndex > 0) && (playerScoreRow.frames[frameIndex - 1].score === '/');
                    
                    if(previousSpare) {
                        var previousSpareScore = 10 + scoreParser.toInt(playerScoreRow.frames[frameIndex].tryScores[0]);
                        playerScoreRow.frames[frameIndex - 1].scoreValue += previousSpareScore;
                        playerScoreRow.frames[frameIndex].scoreValue += previousSpareScore;
                        playerScoreRow.totalScore += previousSpareScore;
                    }  

                    var previousStrike = (frameIndex > 1) && playerScoreRow.frames[frameIndex - 2].score === 'X' && (playerScoreRow.frames[frameIndex].tryScores[1] !== '-' || playerScoreRow.frames[frameIndex].tryScores[0] === 'X');
                    
                    if(previousStrike) {
                        var previousStrikeScore = 10 + scoreParser.toInt(playerScoreRow.frames[frameIndex].tryScores[0])  + scoreParser.toInt(playerScoreRow.frames[frameIndex].tryScores[1]) + scoreParser.toInt(playerScoreRow.frames[frameIndex - 1].tryScores[0]) + scoreParser.toInt(playerScoreRow.frames[frameIndex - 1].tryScores[1]);
                        playerScoreRow.totalScore += previousStrikeScore;                    
                        playerScoreRow.frames[frameIndex - 2].scoreValue += previousStrikeScore;
                        playerScoreRow.frames[frameIndex - 1].scoreValue += previousStrikeScore;
                        playerScoreRow.frames[frameIndex].scoreValue += previousStrikeScore;
                    }

                    
                    if (frameIndex === 9 && playerScoreRow.frames[frameIndex].tryScores[0] === 'X') {
                        playerScoreRow.totalScore += scoreParser.toInt(playerScoreRow.frames[frameIndex].tryScores[1]) + scoreParser.toInt(playerScoreRow.frames[frameIndex].tryScores[2]) ;
                    }  
                                    
                    playerScoreRow.frames[frameIndex].scoreValue = playerScoreRow.totalScore;
                }
            }
            
            return playerScoreRow;   
        }
    };
}]);
app.factory('scoreCard', ['scoreCalculator', function(scoreCalculator) {
    
    return {
        
        playerRows : [ new PlayerScoreRow() ],
       
        addScoreToFrame :  function (playerNumber, frame, tryNumber, score) {
            score = score.toUpperCase();
            
            if (score !== '-' && score !== '/' && score !== 'X' && (isNaN(score) || parseInt(score) > 9)) {
                throw (new Error('Try score entered must be number between 0 and 9, \'-\' (for a missed try), \'X\' for a first try score or \'/\' for a second try score of a frame'));
            }
            
            if (score === '/' && tryNumber < 1) {
                throw(new Error('Try score can only be entered as \'/\' for a second try in a frame'));
            }
            
            if (score === 'X' && tryNumber > 0 && frame < 9) {
                throw(new Error('Try score can only be entered as \'X\' for a first try in a frame, before frame 10'));
            }
            
            this.playerRows[playerNumber].frames[frame].tryScores[tryNumber] = score;
            this.playerRows[playerNumber] = scoreCalculator.recalculateScores(this.playerRows[playerNumber]);
        },
        
        addPlayerRow : function() {
            this.playerRows.push(new PlayerScoreRow());
        },
        
        clearScoreCard : function() {
            this.playerRows = [ new PlayerScoreRow() ];
        }
    }; 
}]);
app.factory('scoreParser', function() {
    return  {
        toInt : function(tryScore) {
        if (tryScore === '-') {
            return 0;
        }
        return tryScore === 'X' ? 10 : parseInt(tryScore);    
        }
    };
});