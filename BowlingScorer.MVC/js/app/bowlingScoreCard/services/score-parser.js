app.factory('scoreParser', function() {
    return  {
        toInt : function(tryScore) {
        if (tryScore === '-') {
            return 0;
        }
        return tryScore === 'X' ? 10 : parseInt(tryScore);    
        }
    };
});