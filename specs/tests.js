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
    
    describe("First roll score entered", function() {
       
        it("should show total score as 5 when 5 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '5');
            expect($scope.totalScore).toEqual(5);
            expect($scope.turns[0].score).toEqual('5');
        });
        
        it("should show total score as 7 when 7 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '7');
            expect($scope.totalScore).toEqual(7);       
            expect($scope.turns[0].score).toEqual('7');
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
       
        it("should show total score as 12 when 5, 2 then 5 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '2');
            $scope.enterPlayerScore(1, 0, '5');
            expect($scope.totalScore).toEqual(12);  
            expect($scope.turns[0].score).toEqual('7');
            expect($scope.turns[1].score).toEqual('5');
        });
       
        it("should show total score as 17 when 5, 2, 5 then 5 entered", function() {
            $controller('ScoreCardController', { $scope: $scope });
            $scope.enterPlayerScore(0, 0, '5');
            $scope.enterPlayerScore(0, 1, '2');
            $scope.enterPlayerScore(1, 0, '5');
            $scope.enterPlayerScore(1, 1, '5');
            expect($scope.totalScore).toEqual(17);  
            expect($scope.turns[0].score).toEqual('7');
            expect($scope.turns[1].score).toEqual('10');
        });
    });
});