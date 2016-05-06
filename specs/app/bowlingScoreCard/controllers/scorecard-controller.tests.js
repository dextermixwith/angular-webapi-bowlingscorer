describe("Scorecard Controller", function() {
	var $controller;
    var $scope;
	
	beforeEach(function() {
        module('bowlingScorer');
        
        inject(function(_$controller_) {
		    $controller = _$controller_;
            $scope = {};
	    })
    });
    
	describe("New ScoreCard", function() {
        it("should have a total score of 0", function() {
            $controller('ScoreCardController', { $scope: $scope });

			expect($scope.totalScore).toEqual(0);
		});
        
        it("should have a empty player name", function() {
			$controller('ScoreCardController', { $scope: $scope });

			expect($scope.playerName).toEqual('');
		});
	});
    
    describe("First try score entered - ", function() {
       
        it("when 5 entered, then score value for frame 1 is 0 and total score is 0", function() {
            $controller('ScoreCardController', { $scope: $scope });

            $scope.enterPlayerScore(0, 0, '5');

            expect($scope.frames[0].scoreValue).toEqual(0);
            expect($scope.totalScore).toEqual(0);
        });
        
    }); 
    
    describe("Second try score entered", function() {
       
        it("when 5 then 2 entered, then score value for frame 1 is 7 and total score is 7 ", function() {
            $controller('ScoreCardController', { $scope: $scope });

            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '2');

            expect($scope.frames[0].scoreValue).toEqual(7);
            expect($scope.totalScore).toEqual(7);  
        });
       
        it("when 1 then 2 entered, then the score value for frame 1 is 3 and total score is 3 ", function() {
            $controller('ScoreCardController', { $scope: $scope });

            $scope.enterPlayerScore(0, 0, '1');
            $scope.enterPlayerScore(0, 1, '2');

            expect($scope.frames[0].scoreValue).toEqual(3);
            expect($scope.totalScore).toEqual(3);       
        });
    });
    
       
    describe("Second frame and first try score entered", function() {
       
        it("when 5, 2 then 5 entered, then frame score for frame 1 is 7 and total score as 7 ", function() {
            $controller('ScoreCardController', { $scope: $scope });

            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '2');
            $scope.enterPlayerScore(1, 0, '5');

            expect($scope.frames[0].scoreValue).toEqual(7);
            expect($scope.totalScore).toEqual(7);  
        });
       
        it("when 5, 2, 5 and 3 entered, then frame score for frame 1 is 7 and frame score for frame 2 is 8 and total score is 15", function() {
            $controller('ScoreCardController', { $scope: $scope });

            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '2');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '3');

            expect($scope.frames[0].scoreValue).toEqual(7);
            expect($scope.frames[1].scoreValue).toEqual(15);
            expect($scope.totalScore).toEqual(15);  
        });
        
    });
    
    describe("Total for frame is 10 (spare) - ", function() {
       
        it("when 5, 5 entered, then frame score for frame 1 is 0 and total score is 0", function() {
            $controller('ScoreCardController', { $scope: $scope });
            
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '5');

            expect($scope.frames[0].scoreValue).toEqual(0);
            expect($scope.totalScore).toEqual(0);  
        });
       
        it("when 5, 5, 5 then 1 entered, then score for frame 1 is 15 and score for frame 2 is 21 and total score 21", function() {
            $controller('ScoreCardController', { $scope: $scope });
            
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '5');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '1');

            expect($scope.frames[0].scoreValue).toEqual(15);
            expect($scope.frames[1].scoreValue).toEqual(21);
            expect($scope.totalScore).toEqual(21);  
        }); 
       
        it("when 5, 5, 5 then 5 entered, then score for frame is 15 and score for frame 2 is 15 and total score is 15 ", function() {
            $controller('ScoreCardController', { $scope: $scope });

            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '5');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '5');
            
            expect($scope.frames[0].scoreValue).toEqual(15);
            expect($scope.frames[1].scoreValue).toEqual(15);
            expect($scope.totalScore).toEqual(15);  
        });
         
        it("when 5, 5, 5, 5 then 5 entered, then score for frame is 15 for frame 1, and score for frame 2 is 30, and score for frame 3 is 30, and total score is 30 ", function() {
            $controller('ScoreCardController', { $scope: $scope });
            
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '5');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '5');
            $scope.enterPlayerScore(2, 0, '5');

            expect($scope.frames[0].scoreValue).toEqual(15);
            expect($scope.frames[1].scoreValue).toEqual(30);
            expect($scope.frames[2].scoreValue).toEqual(30);
            
            expect($scope.totalScore).toEqual(30);  
        });
                 
        it("when 5, 5, 5, 5, 5 then 2 entered,  then score for frame is 15 for frame 1, and score for frame 2 is 30, and score for frame 3 is 37, and total score is 37 ", function() {
            $controller('ScoreCardController', { $scope: $scope });
            
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '5');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '5');
            $scope.enterPlayerScore(2, 0, '5');
            $scope.enterPlayerScore(2, 1, '2');
 
            expect($scope.frames[0].scoreValue).toEqual(15);
            expect($scope.frames[1].scoreValue).toEqual(30);
            expect($scope.frames[2].scoreValue).toEqual(37);
            
            expect($scope.totalScore).toEqual(37);  
        });
        
        it("when 5 entered for all tries plus an extra try score of 5 in frame 10, then total score s 150 and each frame score accumulates correctly", function() {
            $controller('ScoreCardController', { $scope: $scope });
            for(var frameIndex = 0; frameIndex < 10; frameIndex++){
                $scope.enterPlayerScore(frameIndex, 0, '5');
                $scope.enterPlayerScore(frameIndex, 1, '5');                
            }

            $scope.enterPlayerScore(9, 2, '5');
 
            expect($scope.totalScore).toEqual(150);
            
            var accumulatedScore = 15;
            for(var frameIndex = 0; frameIndex < 10; frameIndex++) {
                expect($scope.frames[frameIndex].scoreValue).toEqual(accumulatedScore);
                accumulatedScore += 15;
            }  
        });
        
        it("when spares (7 and 3) for all frames plus an extra try of 3 in frame 10, then total score is 166 and each frame score accumulates correctly", function() {
            $controller('ScoreCardController', { $scope: $scope });
            for(var frameIndex = 0; frameIndex < 10; frameIndex++){
                $scope.enterPlayerScore(frameIndex, 0, '7');
                $scope.enterPlayerScore(frameIndex, 1, '3');                
            }

            $scope.enterPlayerScore(9, 2, '3');

            expect($scope.totalScore).toEqual(166);  

            var accumulatedScore = 0;
            for(var frameIndex = 0; frameIndex < 9; frameIndex++) {
                accumulatedScore += 17;
                expect($scope.frames[frameIndex].scoreValue).toEqual(accumulatedScore);
            }              
            
            accumulatedScore += 13;
            expect($scope.frames[frameIndex].scoreValue).toEqual(accumulatedScore);
            
        });
    });
    
    describe("Strike is scored (10 in one try) - ", function() {
       it("when X scored on first try, then total score is 0 and frame score for frame 1 is 0", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, 'X');
            
            expect($scope.totalScore).toEqual(0);  
            expect($scope.frames[0].scoreValue).toEqual(0);
       });

       it("when X scored on first try and then 3, then total score is 0 and frame score for frame 1 is 0", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, 'X');
            $scope.enterPlayerScore(1, 0, '3');
            
            expect($scope.totalScore).toEqual(0);  
            expect($scope.frames[0].scoreValue).toEqual(0);            
       });

       it("when X scored on first try and next frame 3 and 5, then total score is 8 and frame score for frame 1 is 0 and score for frame 2 is 8", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, 'X');
            $scope.enterPlayerScore(1, 0, '3');
            $scope.enterPlayerScore(1, 1, '5');
            
            expect($scope.totalScore).toEqual(8);  
            expect($scope.frames[0].scoreValue).toEqual(0);            
            expect($scope.frames[1].scoreValue).toEqual(8);                        
       });
       
       
       it("when X scored on first try and then 5 and 5, then total score is 8 and frame score for frame 1 is 0 and score for frame 2 is 0", function() {
            $controller('ScoreCardController', { $scope: $scope });
           
            $scope.enterPlayerScore(0, 0, 'X');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '5');
            
            expect($scope.totalScore).toEqual(0);  
            expect($scope.frames[0].scoreValue).toEqual(0);            
            expect($scope.frames[1].scoreValue).toEqual(0);  
       });
       
       
       it("when X scored on first try and then 5, 5 and 4, then total score is 14 and frame score for frame 1 is 0 and score for frame 2 is 14", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, 'X');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '5');
            $scope.enterPlayerScore(2, 0, '4');
            
            expect($scope.totalScore).toEqual(14);  
            expect($scope.frames[0].scoreValue).toEqual(0);            
            expect($scope.frames[1].scoreValue).toEqual(14); 
       });       
        
       it("when X scored on first try and then X, 4 and 4, then total score is 36 and frame score for frame 1 is 28 and score for frame 2 is 28 and score for frame 3 is 36", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, 'X');
            $scope.enterPlayerScore(1, 0, 'X');
            $scope.enterPlayerScore(2, 0, '4');
            $scope.enterPlayerScore(2, 1, '4');
            
            expect($scope.totalScore).toEqual(36);  
            expect($scope.frames[0].scoreValue).toEqual(28);            
            expect($scope.frames[1].scoreValue).toEqual(28); 
            expect($scope.frames[2].scoreValue).toEqual(36); 
       });   
       
               
       it("when X scored on first try and then 6, 4 and X, then total score is 50, and frame score for frame 1 is 30 and score for frame 2 is 50 and score for frame 3 is 50", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, 'X');
            $scope.enterPlayerScore(1, 0, '6');
            $scope.enterPlayerScore(1, 1, '4');
            $scope.enterPlayerScore(2, 0, 'X');
            
            expect($scope.totalScore).toEqual(50);  
            expect($scope.frames[0].scoreValue).toEqual(30);            
            expect($scope.frames[1].scoreValue).toEqual(50); 
            expect($scope.frames[2].scoreValue).toEqual(50); 
       });  
       
       it("when 'X' entered for all tries plus an extra try of 'X' in frame 10, then total score is 300 ", function() {
            $controller('ScoreCardController', { $scope: $scope });
            for(var frameIndex = 0; frameIndex < 10; frameIndex++){
                $scope.enterPlayerScore(frameIndex, 0, 'X');
            }

            $scope.enterPlayerScore(9, 1, 'X');
            $scope.enterPlayerScore(9, 2, 'X');
            
            expect($scope.totalScore).toEqual(300);   
        });
    });
});