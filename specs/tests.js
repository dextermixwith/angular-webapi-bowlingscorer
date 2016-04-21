describe("ScoreCardController", function() {
	
	beforeEach(module('bowlingScoreCard'));
	
	var $controller;
    var $scope;
	
	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
        $scope = {};
	}));
    
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
    
    describe("First roll score entered - ", function() {
       
        it("should show total score as 0 when 5 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '5');
            expect($scope.totalScore).toEqual(0);
            expect($scope.turns[0].score).toEqual('0');
        });
        
    }); 
    
    describe("Second roll score entered", function() {
       
        it("should show total score as 7 when 5 then 2 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '2');
            expect($scope.totalScore).toEqual(7);  
            expect($scope.turns[0].score).toEqual('7');
        });
       
        it("should show total score as 3 when 1 then 2 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '1');
            $scope.enterPlayerScore(0, 1, '2');
            expect($scope.totalScore).toEqual(3);       
            expect($scope.turns[0].score).toEqual('3');
        });
    });
    
       
    describe("Second turn and first roll score entered", function() {
       
        it("should show total score as 7 when 5, 2 then 5 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '2');
            $scope.enterPlayerScore(1, 0, '5');
            expect($scope.totalScore).toEqual(7);  
            expect($scope.turns[0].score).toEqual('7');
            expect($scope.turns[1].score).toEqual('0');
        });
       
        it("should show total score as 15 when 5, 2, 5 then 3 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '2');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '3');
            expect($scope.totalScore).toEqual(15);  
            expect($scope.turns[0].score).toEqual('7');
            expect($scope.turns[1].score).toEqual('8');
        });
        
    });
    
    describe("Total for turn is 10 (spare) - ", function() {
       
        it("should show total score as 10 and turn score as '/' when 5 then 5 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '5');
            expect($scope.totalScore).toEqual(0);  
            expect($scope.turns[0].score).toEqual('/');
        });
       
        it("should show total score as 21 and turn scores as '/' and 6, when 5, 5, 5 then 1 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '5');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '1');
            expect($scope.totalScore).toEqual(21);  
            expect($scope.turns[0].score).toEqual('/');
            expect($scope.turns[1].score).toEqual('6');
        }); 
       
        it("should show total score as 15 and turn scores as '/' and '/', when 5, 5, 5 then 5 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '5');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '5');
            expect($scope.turns[0].score).toEqual('/');
            expect($scope.turns[1].score).toEqual('/');
            expect($scope.totalScore).toEqual(15);  
        });
         
        it("should show total score as 30 and turn scores as '/', '/' and '1', when 5, 5, 5, 5 then 5 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '5');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '5');
            $scope.enterPlayerScore(2, 0, '5');
            expect($scope.turns[0].score).toEqual('/');
            expect($scope.turns[1].score).toEqual('/');
            expect($scope.totalScore).toEqual(30);  
        });
                 
        it("should show total score as 37 and turn scores as '/', '/' and '1', when 5, 5, 5, 5, 5 then 2 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '5');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '5');
            $scope.enterPlayerScore(2, 0, '5');
            $scope.enterPlayerScore(2, 1, '2');
            expect($scope.turns[0].score).toEqual('/');
            expect($scope.turns[1].score).toEqual('/');
            expect($scope.turns[2].score).toEqual('7');
            expect($scope.totalScore).toEqual(37);  
        });
        
        it("should show total score as 150 and turn scores all as '/' when 5 entered for all rolls plus an extra roll of 5 in turn 10", function() {
            $controller('ScoreCardController', { $scope: $scope });
            for(var turnIndex = 0; turnIndex < 10; turnIndex++){
                $scope.enterPlayerScore(turnIndex, 0, '5');
                $scope.enterPlayerScore(turnIndex, 1, '5');                
            }

            $scope.enterPlayerScore(9, 2, '5');
  
            for(var turnIndex = 0; turnIndex < 10; turnIndex++){
                expect($scope.turns[turnIndex].score).toEqual('/');
            }
            
            expect($scope.totalScore).toEqual(150);  
        });
        
        it("should show total score as 166 and turn scores all as '/' when spares (7 and 3) for all turns plus an extra roll of 3 in turn 10", function() {
            $controller('ScoreCardController', { $scope: $scope });
            for(var turnIndex = 0; turnIndex < 10; turnIndex++){
                $scope.enterPlayerScore(turnIndex, 0, '7');
                $scope.enterPlayerScore(turnIndex, 1, '3');                
            }

            $scope.enterPlayerScore(9, 2, '3');
  
            for(var turnIndex = 0; turnIndex < 10; turnIndex++){
                expect($scope.turns[turnIndex].score).toEqual('/');
            }
            
            expect($scope.totalScore).toEqual(166);  
        });
    });
    
    describe("Strike is scored (10 in one roll) - ", function() {
       it("should show a total score as 0 and turn score of 'X' when X scored on first roll", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, 'X');
            expect($scope.totalScore).toEqual(0);  
            expect($scope.turns[0].score).toEqual('X');
       });

       it("should show a total score as 0 and turn scores of 'X' and '0' when X scored on first roll, then 3", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, 'X');
            $scope.enterPlayerScore(1, 0, '3');
            
            expect($scope.totalScore).toEqual(0);  
            expect($scope.turns[0].score).toEqual('X');
            expect($scope.turns[1].score).toEqual('0');
       });

       it("should show a total score as 26 and turn scores of 'X' and '8' when X scored on first roll, then 3 and 5", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, 'X');
            $scope.enterPlayerScore(1, 0, '3');
            $scope.enterPlayerScore(1, 1, '5');
            
            expect($scope.totalScore).toEqual(26);  
            expect($scope.turns[0].score).toEqual('X');
            expect($scope.turns[1].score).toEqual('8');
       });
       
       
       it("should show a total score as 20 and turn scores of 'X' and '/' when X scored on first roll, then 5 and 5", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, 'X');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '5');
            
            expect($scope.totalScore).toEqual(20);  
            expect($scope.turns[0].score).toEqual('X');
            expect($scope.turns[1].score).toEqual('/');
       });
       
       
       it("should show a total score as 34 and turn scores of 'X' and '/' when X scored on first roll, then 5, 5 and 4", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, 'X');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '5');
            $scope.enterPlayerScore(2, 0, '4');
            
            expect($scope.totalScore).toEqual(34);  
            expect($scope.turns[0].score).toEqual('X');
            expect($scope.turns[1].score).toEqual('/');
       });       
        
       it("should show a total score as 46 and turn scores of 'X', 'X' and '8' when X scored on first roll, then X, 4 and 4", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, 'X');
            $scope.enterPlayerScore(1, 0, 'X');
            $scope.enterPlayerScore(2, 0, '4');
            $scope.enterPlayerScore(2, 1, '4');
            
            expect($scope.totalScore).toEqual(46);  
            expect($scope.turns[0].score).toEqual('X');
            expect($scope.turns[1].score).toEqual('X');
            expect($scope.turns[2].score).toEqual('8');
       });         
    });
});