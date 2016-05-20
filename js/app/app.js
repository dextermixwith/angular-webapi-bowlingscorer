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
    
    this.playerName = playerName || "";
    this.totalScore = 0;
    this.frames = framesArray;  
};