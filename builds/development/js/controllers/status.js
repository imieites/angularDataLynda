myApp.controller('StatusController', function($scope, $rootScope, $firebase, $firebaseAuth, FIREBASE_URL, $location, Authentication){

    $scope.logout = function(){
        Authentication.logout();
        $location.path('/login');
    }; // logout

    var ref = new Firebase(FIREBASE_URL);
    var authObj = $firebaseAuth(ref);

    // angularfire no hace broadcast del evento de logeo, por lo que tengo que usar esto
    // más info en: http://stackoverflow.com/questions/27051669/the-rootscope-on-method-for-angular-is-not-being-triggered-when-i-call-it-w
    
    $rootScope.$on('$firebaseAuth:authWithPassword', function(e, authUser){
        console.log('status.js: logged in user '+ authUser.uid);
        
        var ref = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
        var user = $firebase(ref).$asObject();

        user.$loaded().then(function(){ // espero a que llegue la info del usuario desde la db
            $rootScope.currentUser = user;
        });

    }); //$firebaseAuth:authWithPassword

    $rootScope.$on('$firebaseAuth:logout', function(e, authUser){
        $rootScope.currentUser = null;
        
    }); //$firebaseAuth:logout


}); //StatusController