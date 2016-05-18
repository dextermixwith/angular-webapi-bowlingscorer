'use strict';

app.factory('scoreCalculator', ['scoreParser', function(scoreParser){
   return {
       recalculateScores : function(playerScoreRow) {
            playerScoreRow.totalScore = 0;

            for(var frameIndex = 0; frameIndex < playerScoreRow.frames.length; frameIndex++){
               if (playerScoreRow.frames[frameIndex].tryScores[0] != '-') { 
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
                            throw(new Error("Total try scores entered for frames 1 to 9 cannot come to more than 10"));
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