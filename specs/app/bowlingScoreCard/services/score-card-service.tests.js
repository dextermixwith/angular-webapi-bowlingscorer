'use strict';

var scoreCard, mockScoreCalculator, updatedPlayerRow;

describe("scoreCard", function(){
    beforeEach(function(){
        
        updatedPlayerRow = new PlayerScoreRow("jhskdajhksjahd");
        updatedPlayerRow.frames[0].tryScores[0] = "7";
        updatedPlayerRow.frames[0].tryScores[1] = "2";
        updatedPlayerRow.frames[0].score = "9";
        updatedPlayerRow.frames[0].scoreValue = 9;  
        updatedPlayerRow.totalScore = 9;      
        
        module('bowlingScorer', function($provide){
            mockScoreCalculator = jasmine.createSpyObj('scoreCalculator', ['recalculateScores']);    
            
            mockScoreCalculator.recalculateScores.and.returnValue(updatedPlayerRow);

            $provide.value('scoreCalculator', mockScoreCalculator);            
        });
        
        inject(function(_scoreCard_){
           scoreCard = _scoreCard_; 
        });
    });
    
    describe("Score Card - initial state", function(){
       
       
       it("should have one player row set up with a blank name", function() {
          expect(scoreCard.playerRows[0].playerName).toBe(""); 
       });

       it("should have one player row set up with a total score of 0", function () {
           expect(scoreCard.playerRows[0].totalScore).toBe(0);
       });

       it("should have one player row set up with 10 frames", function() {
           expect(scoreCard.playerRows[0].frames.length).toEqual(10);
       }); 
       
    });
    
    describe("Adding a valid try score entry", function() {
        
        it("when a try score is added, then scores are re-calculated, and the new score values are updated by the service", function(){
            var updateTryScoreTester = {
                asymmetricMatch: function(actual) {
                    return (actual.playerName === "" && actual.frames[0].tryScores[0] === "6");
                }
            };
            
            scoreCard.addScoreToFrame(0, 0, "6");
            expect(mockScoreCalculator.recalculateScores).toHaveBeenCalledWith(updateTryScoreTester);
            expect(scoreCard.playerRows[0]).toBe(updatedPlayerRow);
        });
        
        it("should allow a score of 'X' to be entered into the first try score of a frame", function() {
            var updateTryScoreTester = {
                asymmetricMatch: function(actual) {
                    return (actual.playerName === "" && actual.frames[0].tryScores[0] === "X");
                }
            };
            
            scoreCard.addScoreToFrame(0, 0, "X");
            expect(mockScoreCalculator.recalculateScores).toHaveBeenCalledWith(updateTryScoreTester);
            expect(scoreCard.playerRows[0]).toBe(updatedPlayerRow);
        });
                        
        it("should allow a score of 'x' to be entered into the first try score of a frame", function() {
            var updateTryScoreTester = {
                asymmetricMatch: function(actual) {
                    return (actual.playerName === "" && actual.frames[0].tryScores[0] === "X");
                }
            };
            
            scoreCard.addScoreToFrame(0, 0, "x");
            expect(mockScoreCalculator.recalculateScores).toHaveBeenCalledWith(updateTryScoreTester);
            expect(scoreCard.playerRows[0]).toBe(updatedPlayerRow);
        });

        it("should allow a score of '/' to be entered into the second try score of a frame", function() {
            
            var updateTryScoreTesterForTryScore2 = {
                asymmetricMatch: function(actual) {
                    return (actual.playerName === "" && actual.frames[0].tryScores[1] === "/");
                }
            };
             
            scoreCard.addScoreToFrame(0, 1, "/");
            expect(mockScoreCalculator.recalculateScores).toHaveBeenCalledWith(updateTryScoreTesterForTryScore2);

            expect(scoreCard.playerRows[0]).toBe(updatedPlayerRow);
        });
  
        it("should allow a score of 'X' to be entered into the second try score of frame 10", function() {
            
            var updateTryScoreTester = {
                asymmetricMatch: function(actual) {
                    return (actual.playerName === "" && actual.frames[9].tryScores[1] === "X");
                }
            };
             
            scoreCard.addScoreToFrame(9, 1, "X");
            expect(mockScoreCalculator.recalculateScores).toHaveBeenCalledWith(updateTryScoreTester);

            expect(scoreCard.playerRows[0]).toBe(updatedPlayerRow);
        });
  
        it("should allow a score of '-' to be entered", function() {
            
            var updateTryScoreTester = {
                asymmetricMatch: function(actual) {
                    return (actual.playerName === "" && actual.frames[0].tryScores[1] === "-");
                }
            };
             
            scoreCard.addScoreToFrame(0, 1, "-");
            expect(mockScoreCalculator.recalculateScores).toHaveBeenCalledWith(updateTryScoreTester);

            expect(scoreCard.playerRows[0]).toBe(updatedPlayerRow);
        });  
  });
    
    describe("Adding an invalid try score entry", function() {
        it("should throw an error when a numeric value > 9 is entered", function(){
            try {
                scoreCard.addScoreToFrame(0, 0, "10");
                fail("Expected call to addScoreToFrame with non-numeric score to throw an error"); 
            } catch (error) {
                expect(error.message).toEqual("Try score entered must be number between 0 and 9, '-' (for a missed try), 'X' for a first try score or '/' for a second try score of a frame");
            }
        });
        
        it("should throw an error when a non-numeric value is entered ", function(){
            try {
                scoreCard.addScoreToFrame(0, 0, "jhsslajhdg");
                fail("Expected call to addScoreToFrame with non-numeric score to throw an error"); 
            } catch (error) {
                expect(error.message).toEqual("Try score entered must be number between 0 and 9, '-' (for a missed try), 'X' for a first try score or '/' for a second try score of a frame");
            }
        }); 
             
        it("should throw an error when a '/' is entered for second try of frame", function(){
            try {
                scoreCard.addScoreToFrame(0, 0, "/");
                fail("Expected call to addScoreToFrame with '/' score to throw an error"); 
            } catch (error) {
                expect(error.message).toEqual("Try score can only be entered as '/' for a second try in a frame");
            }
        });    
             
        it("should throw an error when a 'X' is entered for second try of frame and not in frame 10", function(){
            try {
                scoreCard.addScoreToFrame(0, 1, "X");
                fail("Expected call to addScoreToFrame with 'X' score on second try when on in frame 10 to throw an error"); 
            } catch (error) {
                expect(error.message).toEqual("Try score can only be entered as 'X' for a first try in a frame, before frame 10");
            }
        });  
    });

});