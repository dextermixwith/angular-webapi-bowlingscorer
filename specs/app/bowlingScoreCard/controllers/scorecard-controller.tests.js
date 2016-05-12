describe("Scorecard Controller", function() {
	var $controller;
    var $scope;
	
	beforeEach(function() {
        module('bowlingScorer', function($provide){
            mockScoreCard = jasmine.createSpyObj('scoreCard', ['addScoreToFrame']);    
            
            mockScoreCard.addScoreToFrame();
            
            $provide.value('scoreCard', mockScoreCard);            
        });
        
        inject(function(_$controller_) {
		    $controller = _$controller_;
            $scope = {};
	    })
    });
    
	describe("New Score Entered", function() {
        it("when new player try score entered, then score is added to frame on score card", function() {
            $controller('ScoreCardController', { $scope: $scope });
            
            $scope.enterPlayerScore(2, 1, 6);

			expect(mockScoreCard.addScoreToFrame).toHaveBeenCalledWith(2, 1, 6);
		});
        
        it("should transform a blank string entered as a score to a '-'", function() {
            $controller('ScoreCardController', { $scope: $scope });
            
            $scope.enterPlayerScore(2, 1, "");

			expect(mockScoreCard.addScoreToFrame).toHaveBeenCalledWith(2, 1, "-");
        });
	});
});