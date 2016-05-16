'use strict';

var scoreCalculator, mockScoreParser, playerScoreRow;

describe("Score Calculator service", function(){

    beforeEach(function(){
        
        playerScoreRow = new PlayerScoreRow();
        
        module('bowlingScorer', function($provide){
            mockScoreParser = jasmine.createSpyObj('scoreParser', ['toInt']);    

            $provide.value('scoreParser', mockScoreParser);            
        });
        
        inject(function(_scoreCalculator_){
           scoreCalculator = _scoreCalculator_; 
        });
    });
    
    describe("Player Score Row with first try score entered - ", function() {
       
        it("when a player score row with first try of 5 entered, then score value for frame 1 is 0 and total score is 0", function() {
          
            playerScoreRow.frames[0].tryScores[0] = "5";
            
            mockScoreParser.toInt.and.returnValue(5);
            
            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);
            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(1);
 
            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(0);
            expect(updatedPlayScoreRow.totalScore).toEqual(0);
        });
        
    }); 
    
    describe("Player Score Row with second try score entered", function() {
       
       it("when a player score row with 5 then 2 entered, then score value for frame 1 is 7 and total score is 7 ", function() {
            playerScoreRow.frames[0].tryScores[0] = "5";
            playerScoreRow.frames[0].tryScores[1] = "2";
            
            mockScoreParser.toInt.and.returnValues(5, 2);
            
            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);
            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("2");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(2);

            expect(playerScoreRow.frames[0].scoreValue).toEqual(7);
            expect(playerScoreRow.totalScore).toEqual(7);  
        });
       
        it("when a player score row with 1 then 2 entered, then the score value for frame 1 is 3 and total score is 3 ", function() {
            playerScoreRow.frames[0].tryScores[0] = "1";
            playerScoreRow.frames[0].tryScores[1] = "2";
            
            mockScoreParser.toInt.and.returnValues(1, 2);
            
            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);
            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("1");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("2");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(2);

            expect(playerScoreRow.frames[0].scoreValue).toEqual(3);
            expect(playerScoreRow.totalScore).toEqual(3);       
        });
    });
    
           
    describe("Second frame and first try score entered", function() {
       
        it("when 5, 2 then 5 entered, then frame score for frame 1 is 7 and total score as 7 ", function() {
            playerScoreRow.frames[0].tryScores[0] = "5";
            playerScoreRow.frames[0].tryScores[1] = "2";
            playerScoreRow.frames[1].tryScores[0] = "7";
            
            mockScoreParser.toInt.and.returnValues(5, 2, 7);
            
            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);
            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("2");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("7");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(3);
            
            expect(playerScoreRow.frames[0].scoreValue).toEqual(7);
            expect(playerScoreRow.totalScore).toEqual(7);  
        });
       
        it("when 5, 2, 5 and 3 entered, then frame score for frame 1 is 7 and frame score for frame 2 is 8 and total score is 15", function() {
            playerScoreRow.frames[0].tryScores[0] = "5";
            playerScoreRow.frames[0].tryScores[1] = "2";
            playerScoreRow.frames[1].tryScores[0] = "5";
            playerScoreRow.frames[1].tryScores[1] = "3";
            
            mockScoreParser.toInt.and.returnValues(5, 2, 5, 3);
            
            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);
            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("2");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(4);

            expect(playerScoreRow.frames[0].scoreValue).toEqual(7);
            expect(playerScoreRow.frames[1].scoreValue).toEqual(15);
            expect(playerScoreRow.totalScore).toEqual(15);  
        });
        
    });
    
        
    describe("Total for frame is 10 (spare) - ", function() {
       
        it("when 5, 5 entered, then frame score for frame 1 is 0 and total score is 0", function() {
            playerScoreRow.frames[0].tryScores[0] = "5";
            playerScoreRow.frames[0].tryScores[1] = "5";
            
            mockScoreParser.toInt.and.returnValues(5, 5);

            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);

            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(2);

            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(0);
            expect(updatedPlayScoreRow.totalScore).toEqual(0);  
        });
       
        it("when 5, / entered, then frame score for frame 1 is 0 and total score is 0", function() {
            playerScoreRow.frames[0].tryScores[0] = "5";
            playerScoreRow.frames[0].tryScores[1] = "/";
            
            mockScoreParser.toInt.and.returnValues(5);

            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);

            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(1);

            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(0);
            expect(updatedPlayScoreRow.frames[0].score).toEqual("/");
            expect(updatedPlayScoreRow.totalScore).toEqual(0);  
        });
               
        it("when 5, 5, 5 then 1 entered, then score for frame 1 is 15 and score for frame 2 is 21 and total score 21", function() {
            playerScoreRow.frames[0].tryScores[0] = "5";
            playerScoreRow.frames[0].tryScores[1] = "5";
            playerScoreRow.frames[1].tryScores[0] = "5";
            playerScoreRow.frames[1].tryScores[1] = "1";
            
            mockScoreParser.toInt.and.returnValues(5, 5, 5, 1, 5);
            
            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);
            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("1");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(5);

            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(15);
            expect(updatedPlayScoreRow.frames[1].scoreValue).toEqual(21);
            expect(updatedPlayScoreRow.totalScore).toEqual(21);  
        }); 
               
        it("when 5, /, 5 then 1 entered, then score for frame 1 is 15 and score for frame 2 is 21 and total score 21", function() {
            playerScoreRow.frames[0].tryScores[0] = "5";
            playerScoreRow.frames[0].tryScores[1] = "/";
            playerScoreRow.frames[1].tryScores[0] = "5";
            playerScoreRow.frames[1].tryScores[1] = "1";
            
            mockScoreParser.toInt.and.returnValues(5, 5, 1, 5);
            
            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);
            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("1");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(4);

            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(15);
            expect(updatedPlayScoreRow.frames[0].score).toEqual("/");
            expect(updatedPlayScoreRow.frames[1].scoreValue).toEqual(21);
            expect(updatedPlayScoreRow.totalScore).toEqual(21);  
        }); 
               
        it("when 5, 5, 5 then 5 entered, then score for frame is 15 and score for frame 2 is 15 and total score is 15 ", function() {
            playerScoreRow.frames[0].tryScores[0] = "5";
            playerScoreRow.frames[0].tryScores[1] = "5";
            playerScoreRow.frames[1].tryScores[0] = "5";
            playerScoreRow.frames[1].tryScores[1] = "5";
            
            mockScoreParser.toInt.and.returnValues(5, 5, 5, 5, 5);
            
            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);
            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(5);
            
            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(15);
            expect(updatedPlayScoreRow.frames[1].scoreValue).toEqual(15);
            expect(updatedPlayScoreRow.totalScore).toEqual(15);  
        });
         
        it("when 5, 5, 5, 5 then 5 entered, then score for frame is 15 for frame 1, and score for frame 2 is 30, and score for frame 3 is 30, and total score is 30 ", function() {
            playerScoreRow.frames[0].tryScores[0] = "5";
            playerScoreRow.frames[0].tryScores[1] = "5";
            playerScoreRow.frames[1].tryScores[0] = "5";
            playerScoreRow.frames[1].tryScores[1] = "5";
            playerScoreRow.frames[2].tryScores[0] = "5";
            
            mockScoreParser.toInt.and.returnValues(5, 5, 5, 5, 5, 5, 5);
            
            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);
            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(7);

            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(15);
            expect(updatedPlayScoreRow.frames[1].scoreValue).toEqual(30);
            expect(updatedPlayScoreRow.frames[2].scoreValue).toEqual(30);
            
            expect(updatedPlayScoreRow.totalScore).toEqual(30);  
        });
                 
        it("when 5, 5, 5, 5, 5 then 2 entered,  then score for frame is 15 for frame 1, and score for frame 2 is 30, and score for frame 3 is 37, and total score is 37 ", function() {
            playerScoreRow.frames[0].tryScores[0] = "5";
            playerScoreRow.frames[0].tryScores[1] = "5";
            playerScoreRow.frames[1].tryScores[0] = "5";
            playerScoreRow.frames[1].tryScores[1] = "5";
            playerScoreRow.frames[2].tryScores[0] = "5";
            playerScoreRow.frames[2].tryScores[1] = "2";
            
            mockScoreParser.toInt.and.returnValues(5, 5, 5, 5, 5, 5, 2, 5);
            
            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);
            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("2");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(8);
            
            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(15);
            expect(updatedPlayScoreRow.frames[1].scoreValue).toEqual(30);
            expect(updatedPlayScoreRow.frames[2].scoreValue).toEqual(37);
            
            expect(updatedPlayScoreRow.totalScore).toEqual(37);  
        });
                 
        it("when 3, /, 2, /, 5 then 2 entered,  then score for frame is 12 for frame 1, and score for frame 2 is 27, and score for frame 3 is 34, and total score is 34 ", function() {
            playerScoreRow.frames[0].tryScores[0] = "3";
            playerScoreRow.frames[0].tryScores[1] = "/";
            playerScoreRow.frames[1].tryScores[0] = "2";
            playerScoreRow.frames[1].tryScores[1] = "/";
            playerScoreRow.frames[2].tryScores[0] = "5";
            playerScoreRow.frames[2].tryScores[1] = "2";
            
            mockScoreParser.toInt.and.returnValues(3, 2, 2, 5, 2, 5);
            
            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);
            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("3");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("2");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(6);
            
            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(12);
            expect(updatedPlayScoreRow.frames[0].score).toEqual("/");
            expect(updatedPlayScoreRow.frames[1].scoreValue).toEqual(27);
            expect(updatedPlayScoreRow.frames[1].score).toEqual("/");
            expect(updatedPlayScoreRow.frames[2].scoreValue).toEqual(34);
            
            expect(updatedPlayScoreRow.totalScore).toEqual(34);  
        });
                
        it("when 5 entered for all tries plus an extra try score of 5 in frame 10, then total score s 150 and each frame score accumulates correctly", function() {

            for(var frameIndex = 0; frameIndex < 10; frameIndex++){
                playerScoreRow.frames[frameIndex].tryScores[0] = "5";
                playerScoreRow.frames[frameIndex].tryScores[1] = "5";
            }

            playerScoreRow.frames[9].tryScores[2] = "5";
            mockScoreParser.toInt.and.returnValue(5);

            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);

            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(30);
 
            expect(updatedPlayScoreRow.totalScore).toEqual(150);
            
            var accumulatedScore = 15;
            for(var frameIndex = 0; frameIndex < 10; frameIndex++) {
                expect(updatedPlayScoreRow.frames[frameIndex].scoreValue).toEqual(accumulatedScore);
                accumulatedScore += 15;
            }  
        });
        
        it("when spares (7 and 3) for all frames plus an extra try of 3 in frame 10, then total score is 166 and each frame score accumulates correctly", function() {

            for(var frameIndex = 0; frameIndex < 10; frameIndex++){
                playerScoreRow.frames[frameIndex].tryScores[0] = "7";
                playerScoreRow.frames[frameIndex].tryScores[1] = "3";
            }

            playerScoreRow.frames[9].tryScores[2] = "3";
            mockScoreParser.toInt.and.returnValues(7,3 ,7,3,7, 7,3,7, 7,3,7, 7,3,7, 7,3,7, 7,3,7, 7,3,7, 7,3,7, 7,3,3,7);

            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);

            expect(mockScoreParser.toInt).toHaveBeenCalledWith("7");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("3");            
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(30);

            expect(updatedPlayScoreRow.totalScore).toEqual(166);  

            var accumulatedScore = 0;
            for(var frameIndex = 0; frameIndex < 9; frameIndex++) {
                accumulatedScore += 17;
                expect(updatedPlayScoreRow.frames[frameIndex].scoreValue).toEqual(accumulatedScore);
            }              
            
            accumulatedScore += 13;
            expect(updatedPlayScoreRow.frames[frameIndex].scoreValue).toEqual(accumulatedScore);
            
        });
    });
    
        
    describe("Strike is scored (10 in one try) - ", function() {
       it("when X scored on first try, then total score is 0 and frame score for frame 1 is 0", function() {
            playerScoreRow.frames[0].tryScores[0] = "X";
            
            mockScoreParser.toInt.and.returnValues(10);

            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);

            expect(mockScoreParser.toInt).toHaveBeenCalledWith("X");
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(1);
            
            expect(updatedPlayScoreRow.totalScore).toEqual(0);  
            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(0);
       });

       it("when X scored on first try and then 3, then total score is 0 and frame score for frame 1 is 0", function() {
            
            playerScoreRow.frames[0].tryScores[0] = "X";
            playerScoreRow.frames[1].tryScores[0] = "3";
            
            mockScoreParser.toInt.and.returnValues(10, 3);

            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);

            expect(mockScoreParser.toInt).toHaveBeenCalledWith("X");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("3");            
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(2);
                        
            expect(updatedPlayScoreRow.totalScore).toEqual(0);  
            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(0);            
       });

       it("when X scored on first try and next frame 3 and 5, then total score is 8 and frame score for frame 1 is 0 and score for frame 2 is 8", function() {

            playerScoreRow.frames[0].tryScores[0] = "X";
            playerScoreRow.frames[1].tryScores[0] = "3";
            playerScoreRow.frames[1].tryScores[1] = "5";
            
            mockScoreParser.toInt.and.returnValues(10, 3, 5);

            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);

            expect(mockScoreParser.toInt).toHaveBeenCalledWith("X");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("3");            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");            
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(3);
                        
            expect(updatedPlayScoreRow.totalScore).toEqual(8);  
            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(0);            
            expect(updatedPlayScoreRow.frames[1].scoreValue).toEqual(8);                        
       });
       
       
       it("when X scored on first try and then 5 and 5, then total score is 8 and frame score for frame 1 is 0 and score for frame 2 is 0", function() {
            playerScoreRow.frames[0].tryScores[0] = "X";
            playerScoreRow.frames[1].tryScores[0] = "5";
            playerScoreRow.frames[1].tryScores[1] = "5";
            
            mockScoreParser.toInt.and.returnValues(10, 5, 5);

            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);

            expect(mockScoreParser.toInt).toHaveBeenCalledWith("X");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");            
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(3);
            
            expect(updatedPlayScoreRow.totalScore).toEqual(0);  
            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(0);            
            expect(updatedPlayScoreRow.frames[1].scoreValue).toEqual(0);  
       });
       
       
       it("when X scored on first try and then 5, 5 and 4, then total score is 14 and frame score for frame 1 is 0 and score for frame 2 is 14", function() {
            playerScoreRow.frames[0].tryScores[0] = "X";
            playerScoreRow.frames[1].tryScores[0] = "5";
            playerScoreRow.frames[1].tryScores[1] = "5";
            playerScoreRow.frames[2].tryScores[0] = "4";
            
            mockScoreParser.toInt.and.returnValues(10, 5, 5, 4, 4);

            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);

            expect(mockScoreParser.toInt).toHaveBeenCalledWith("X");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("5");            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("4");            
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(5);
            
            expect(updatedPlayScoreRow.totalScore).toEqual(14);  
            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(0);            
            expect(updatedPlayScoreRow.frames[1].scoreValue).toEqual(14); 
       });       
        
       it("when X scored on first try and then X, 4 and 4, then total score is 36 and frame score for frame 1 is 28 and score for frame 2 is 28 and score for frame 3 is 36", function() {
            playerScoreRow.frames[0].tryScores[0] = "X";
            playerScoreRow.frames[1].tryScores[0] = "X";
            playerScoreRow.frames[2].tryScores[1] = "4";
            playerScoreRow.frames[2].tryScores[0] = "4";
            
            mockScoreParser.toInt.and.returnValues(10, 10, 4, 4, 10, 0, 4, 4);

            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);

            expect(mockScoreParser.toInt).toHaveBeenCalledWith("X");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("4");            
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(8);
            
            expect(updatedPlayScoreRow.totalScore).toEqual(36);  
            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(28);            
            expect(updatedPlayScoreRow.frames[1].scoreValue).toEqual(28); 
            expect(updatedPlayScoreRow.frames[2].scoreValue).toEqual(36); 
       });   
       
               
       it("when X scored on first try and then 6, 4 and X, then total score is 50, and frame score for frame 1 is 30 and score for frame 2 is 50 and score for frame 3 is 50", function() {
            playerScoreRow.frames[0].tryScores[0] = "X";
            playerScoreRow.frames[1].tryScores[0] = "6";
            playerScoreRow.frames[1].tryScores[1] = "4";
            playerScoreRow.frames[2].tryScores[0] = "X";
            
            mockScoreParser.toInt.and.returnValues(10, 6, 4, 10, 10, 6, 4, 10, 0);

            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);

            expect(mockScoreParser.toInt).toHaveBeenCalledWith("X");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("4");            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("6");            
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("-");            
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(9);
                        
            expect(updatedPlayScoreRow.totalScore).toEqual(50);  
            expect(updatedPlayScoreRow.frames[0].scoreValue).toEqual(30);            
            expect(updatedPlayScoreRow.frames[1].scoreValue).toEqual(50); 
            expect(updatedPlayScoreRow.frames[2].scoreValue).toEqual(50); 
       });  
       
       it("when 'X' entered for all tries plus an extra try of 'X' in frame 10, then total score is 300 ", function() {
            for(var frameIndex = 0; frameIndex < 10; frameIndex++){
                playerScoreRow.frames[frameIndex].tryScores[0] = "X";
            }

            playerScoreRow.frames[9].tryScores[1] = "X";
            playerScoreRow.frames[9].tryScores[2] = "X";

            mockScoreParser.toInt.and.returnValues(10, 10, 10, 10, 0, 10, 0, 10, 10, 0, 10, 0, 10, 10, 0, 10, 0, 10, 10, 0, 10, 0, 10, 10, 0, 10, 0, 10, 10, 0, 10, 0, 10, 10, 0, 10, 0, 10, 10, 10, 10, 10, 10, 0, 10, 10);
                                                   
            var updatedPlayScoreRow = scoreCalculator.recalculateScores(playerScoreRow);

            expect(mockScoreParser.toInt).toHaveBeenCalledWith("X");
            expect(mockScoreParser.toInt).toHaveBeenCalledWith("-");            
            expect(mockScoreParser.toInt).toHaveBeenCalledTimes(46);
            
            expect(updatedPlayScoreRow.totalScore).toEqual(300);   
        });
    });
});