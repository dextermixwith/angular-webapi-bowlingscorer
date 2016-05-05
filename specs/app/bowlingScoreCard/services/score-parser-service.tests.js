describe("scoreParser", function(){
    beforeEach(function(){
        module('bowlingScorer');
        inject(function(_scoreParser_){
           scoreParser = _scoreParser_; 
        });
    });
    
    describe("Score Parser - toInt", function(){
       it("should return 0 when score is '-'", function() {
           expect(scoreParser.toInt('-')).toEqual(0);
       }); 

       it("should return 10 when score is 'X'", function() {
           expect(scoreParser.toInt('X')).toEqual(10);
       }); 

       it("should return 8 when score is '8'", function() {
           expect(scoreParser.toInt('8')).toEqual(8);
       }); 

       it("should return 3 when score is '3'", function() {
           expect(scoreParser.toInt('3')).toEqual(3);
       }); 
    });
});