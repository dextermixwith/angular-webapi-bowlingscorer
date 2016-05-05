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
    
    describe("Adding a try score entry", function() {
        
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
    })
});