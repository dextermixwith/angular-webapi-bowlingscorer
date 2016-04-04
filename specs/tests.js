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
});