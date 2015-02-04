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
            })
            .then(function(authData){
              $rootScope.$broadcast('$firebaseAuth:authWithPassword',authData);
              return authData;
          });
        }, //login

        logout : function(){
            return authObj.$unauth();
        }, // logout 

        register : function(user) {
            console.log('authentication.js: registering user')
            return authObj.$createUser({ email: user.email, password: user.password })
            .then(function(regUser){
                var ref = new Firebase(FIREBASE_URL + 'users');
                var firebaseUsers = $firebase(ref);

                var userInfo = {
                    date: Firebase.ServerValue.TIMESTAMP,
                    regUser: regUser.uid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }

                firebaseUsers.$set(regUser.uid,userInfo);

            }); // add user
        } // register

    } //myObject

    return myObject;
});
