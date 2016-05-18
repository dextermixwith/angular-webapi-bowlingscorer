'use strict';

app.factory('scoreCard', ['scoreCalculator', function(scoreCalculator) {
    
    return {
        
        playerRows : [ new PlayerScoreRow() ],
       
        addScoreToFrame :  function (playerNumber, frame, tryNumber, score) {
            score = score.toUpperCase();
            
            if (score !== '-' && score !== '/' && score !== 'X' && (isNaN(score) || parseInt(score) > 9)) {
                throw (new Error("Try score entered must be number between 0 and 9, '-' (for a missed try), 'X' for a first try score or '/' for a second try score of a frame"));
            }
            
            if (score === '/' && tryNumber < 1) {
                throw(new Error("Try score can only be entered as '/' for a second try in a frame"));
            }
            
            if (score === 'X' && tryNumber > 0 && frame < 9) {
                throw(new Error("Try score can only be entered as 'X' for a first try in a frame, before frame 10"));
            }
            
            this.playerRows[playerNumber].frames[frame].tryScores[tryNumber] = score;
            this.playerRows[playerNumber] = scoreCalculator.recalculateScores(this.playerRows[playerNumber]);
        },
        
        addPlayerRow : function() {
            this.playerRows.push(new PlayerScoreRow());
        }
    } 
}]);