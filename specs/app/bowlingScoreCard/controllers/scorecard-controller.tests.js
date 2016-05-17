describe("Scorecard Controller", function() {
	var $controller;
    var $scope;
	
	beforeEach(function() {
        module('bowlingScorer', function($provide){
            mockScoreCard = jasmine.createSpyObj('scoreCard', ['addScoreToFrame']);    
            
            $provide.value('scoreCard', mockScoreCard);            
        });
        
        inject(function(_$controller_) {
		    $controller = _$controller_;
            $scope = {};
	    })
        
        $controller('ScoreCardController', { $scope: $scope });
    });
    
	describe("New Score Entered", function() {
        it("when new player try score entered, then score is added to frame on score card", function() {
            $scope.enterPlayerScore(2, 1, "6");

			expect(mockScoreCard.addScoreToFrame).toHaveBeenCalledWith(2, 1, "6");
		});
        
        it("should not update scores when blank string entered", function() {
            $scope.enterPlayerScore(2, 1, "");

			expect(mockScoreCard.addScoreToFrame).not.toHaveBeenCalled();
        });
	});
    
    describe("Invalid score is entered", function(){
       it("should handle an invalid score error", function(){
           mockScoreCard.addScoreToFrame.and.throwError("Invalid score entered");
           var invalidScoreValue = "kjshkjdhakjd";
           $scope.enterPlayerScore(3, 1, invalidScoreValue);
           
           expect(mockScoreCard.addScoreToFrame).toHaveBeenCalledWith(3, 1, invalidScoreValue);
           
           expect($scope.errorMessage).toEqual("Invalid score entered : " + invalidScoreValue);
       });
       
       it("should clear invalid score error when valid score entered after invalid score", function(){
           var validScoreValue = "3";
           $scope.errorMessage = "skjdfhldskjfhldskjfhlksdj";
           
           $scope.enterPlayerScore(3, 1, validScoreValue);

           expect(mockScoreCard.addScoreToFrame).toHaveBeenCalledWith(3, 1, validScoreValue);

           expect($scope.errorMessage).toEqual("");
       });
    });
});