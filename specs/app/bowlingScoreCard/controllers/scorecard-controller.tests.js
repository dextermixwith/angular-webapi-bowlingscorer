describe("Scorecard Controller", function() {
	var $controller;
    var $scope;
	
	beforeEach(function() {
        module('bowlingScorer', function($provide){
            mockScoreCard = jasmine.createSpyObj('scoreCard', ['addScoreToFrame', 'addPlayerRow']);    
            
            $provide.value('scoreCard', mockScoreCard);            
        });
        
        inject(function(_$controller_) {
		    $controller = _$controller_;
            $scope = {};
	    })
        
        $controller('ScoreCardController', { $scope: $scope });
    });
    
	describe("New Score Entered for player 1", function() {
        it("when new player try score entered, then score is added to frame on score card", function() {
            $scope.enterPlayerScore(0, 2, 1, "6");

			expect(mockScoreCard.addScoreToFrame).toHaveBeenCalledWith(0, 2, 1, "6");
		});
        
        it("should not update scores when blank string entered", function() {
            $scope.enterPlayerScore(0, 2, 1, "");

			expect(mockScoreCard.addScoreToFrame).not.toHaveBeenCalled();
        });
	});
    
    describe("Invalid score is entered", function(){
       it("should handle an invalid score error", function(){
           mockScoreCard.addScoreToFrame.and.throwError("Invalid score entered");
           var invalidScoreValue = "kjshkjdhakjd";
           $scope.enterPlayerScore(0, 3, 1, invalidScoreValue);
           
           expect(mockScoreCard.addScoreToFrame).toHaveBeenCalledWith(0, 3, 1, invalidScoreValue);
           
           expect($scope.errorMessage).toEqual("Invalid score entered");
       });
       
       it("should clear invalid score error when valid score entered after invalid score", function(){
           var validScoreValue = "3";
           $scope.errorMessage = "skjdfhldskjfhldskjfhlksdj";
           
           $scope.enterPlayerScore(0, 3, 1, validScoreValue);

           expect(mockScoreCard.addScoreToFrame).toHaveBeenCalledWith(0, 3, 1, validScoreValue);

           expect($scope.errorMessage).toEqual("");
       });
    });
    
    describe("Adding a player", function(){
        it("should add a player row to the score card when add player action called", function(){
            $scope.addPlayer();
            
            expect(mockScoreCard.addPlayerRow).toHaveBeenCalled();        
        });
    });
    
    describe("Flag when game has started", function() {
        it("should set the game started flag when first valid try score entered", function(){
            $scope.enterPlayerScore(0, 0, 0, "1");

			expect(mockScoreCard.addScoreToFrame).toHaveBeenCalledWith(0, 0, 0, "1");
            expect($scope.gameStarted).toBe(true);             
        });
    });
});