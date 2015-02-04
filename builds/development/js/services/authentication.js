myApp.factory('Authentication', function($firebase, $firebaseAuth, FIREBASE_URL, $location, $rootScope) {
    // using $firebaseAuth instead of SimpleLogin 

    var ref = new Firebase(FIREBASE_URL);
    var authObj = $firebaseAuth(ref);

    var myObject = {
        login : function(user) {
            console.log('authentication.js: logging in')
            return authObj.$authWithPassword({
                email: user.email,
                password: user.password
            });
        }, //login

        logout : function(){
            return authObj.$unauth();
        }, // logout 

        register : function(user) {
            console.log('authentication.js: registering user')
            return authObj.$createUser({ email: user.email, password: user.password })
            .then( function(userData) {
                console.log("User " + userData.uid + " created successfully!");
            });
        } // register

    } //myObject

    return myObject;
});
