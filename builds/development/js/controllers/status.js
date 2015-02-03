myApp.controller('StatusController', function($scope, $rootScope, $firebaseAuth, FIREBASE_URL, $location, Authentication){

    var ref = new Firebase(FIREBASE_URL);
    var authObj = $firebaseAuth(ref);

    // angularfire no hace broadcast del evento de logeo, por lo que tengo que usar esto
    // más info en: http://stackoverflow.com/questions/27051669/the-rootscope-on-method-for-angular-is-not-being-triggered-when-i-call-it-w
    authObj.$onAuth(function(authData) {
        if (authData) {
            console.log("Logged in as:", authData.password.email);
            $scope.userEmail = authData.password.email;
        } else {
            console.log("Logged out");
            $scope.userEmail = null;
        }
    });


}); //StatusController