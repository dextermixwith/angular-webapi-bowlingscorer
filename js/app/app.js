'use strict';

var app = angular.module('bowlingScoreCard', []);

var Frame = function() {
    this.tryScores = ['-', '-'];
    this.score = '0'; 
    this.scoreValue = 0; 
};