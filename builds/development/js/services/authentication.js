myApp.factory('Authentication', function($firebase, $firebaseAuth, FIREBASE_URL, $location, $rootScope) {
    // uso $firebaseAuth en vez de SimpleLogin, que ya no se usa en las nuevas versiones.

    var ref = new Firebase(FIREBASE_URL);
    var authObj = $firebaseAuth(ref);

    var myObject = {
        login : function(user) {
            console.log('authentication.js: logging in')
            return authObj.$authWithPassword({
                email: user.email,
                password: user.password
            });
        } //login

    } //myObject

    return myObject;
});