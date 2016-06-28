app.controller('ScoreCardController', ['$scope', '$confirm', 'scoreCard', function($scope, $confirm, scoreCard) {
    
    $scope.scoreCard = scoreCard;
    $scope.errorMessage = '';
    $scope.gameStarted = false;
    
    $scope.enterPlayerScore = function(playerNumber, frame, tryNumber, score) {
        if (score !== '') {
            try {
                $scope.scoreCard.addScoreToFrame(playerNumber, frame, tryNumber, score);
                $scope.gameStarted = true;
                $scope.errorMessage = '';
            } catch (error) {
                $scope.errorMessage = error.message;  
            }
        }
    };
    
    $scope.selectTryScore = function ($event) {
        $event.target.select();
    };
    
    $scope.addPlayer = function() {
        $scope.scoreCard.addPlayerRow();  
    };
    
    $scope.confirmNewGame = function() {
        $confirm({ text : 'Are you want to start a new game? All score data will be lost from the current game.', title : 'New Game', ok: 'Yes', cancel : 'No'})
            .then(function() {
                $scope.newGame();                   
            });
    };
    
    $scope.newGame = function() {
        $scope.scoreCard.clearScoreCard();
        $scope.gameStarted = false;       
    };
}]);