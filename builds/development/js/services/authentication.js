myApp.factory('Authentication', function($firebase, $firebaseAuth, FIREBASE_URL, $location, $rootScope) {
    // using $firebaseAuth instead of SimpleLogin 

    var ref = new Firebase(FIREBASE_URL);
    var authObj = $firebaseAuth(ref);

    var myObject = {
        login : function(user) {
            return authObj.$authWithPassword({
                email: user.email,
                password: user.password
            })
            .then(function(authData){ 
              console.log('authentication.js: logged in user '+ authData.uid);
              $rootScope.$broadcast('$firebaseAuth:authWithPassword',authData); // avisa al scope
              return authData;
          });
        }, //login

        logout : function(){
            return authObj.$unauth()
            .then(function(authData){
                console.log('authentication.js: logged out user'+ authData.uid);
                $rootScope.$broadcast('$firebaseAuth:unauth',authData); // avisa al scope
                return authData;
            });
        }, // logout 

        register : function(user) {
            
            return authObj.$createUser({ email: user.email, password: user.password })
            .then(function(regUser){
                
                console.log('authentication.js: registered user ' + regUser.uid);
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

            }); // add user info
        } // register

    } //myObject

    return myObject;
});
