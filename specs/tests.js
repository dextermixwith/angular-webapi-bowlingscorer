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
    
    describe("First turn score entered", function() {
       
        it("should show total score as 5 when 5 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(1, 5);
            expect($scope.totalScore).toEqual(5);       
        });
        
        it("should show total score as 7 when 7 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(1, 7);
            expect($scope.totalScore).toEqual(7);       
        });
    });
    
    describe("Second turn score entered", function() {
       
        it("should show total score as 7 when 5 then 2 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(1, 5);
            $scope.enterPlayerScore(2, 2);
            expect($scope.totalScore).toEqual(7);       
        });
       
        it("should show total score as 3 when 1 then 2 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(1, 1);
            $scope.enterPlayerScore(2, 2);
            expect($scope.totalScore).toEqual(3);       
        });
    });
});