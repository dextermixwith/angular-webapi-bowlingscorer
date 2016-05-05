'use strict';

app.factory('scoreCard', ['scoreCalculator', function(scoreCalculator) {
    var framesArray = [];
    for (var frameIndex = 0; frameIndex < 10; frameIndex++) {
        framesArray.push(new Frame());
    }
    
    return {
        
        playerRows : [ new PlayerScoreRow() ],
       
        addScoreToFrame :  function (frame, tryNumber, score) {
            this.playerRows[0].frames[frame].tryScores[tryNumber] = score;
            this.playerRows[0] = scoreCalculator.recalculateScores(this.playerRows[0]);
        }
    } 
}]);