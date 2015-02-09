myApp.controller('RegistrationController', 
    function($scope, $firebaseAuth, $location, Authentication, $rootScope, FIREBASE_URL, $firebase){
    

    $scope.login = function() {
        Authentication.login($scope.user)
        .then(function(authData){
            
            var userRef = new Firebase(FIREBASE_URL + 'users/' + authData.uid);
            var userObj = $firebase(userRef).$asObject();

            userObj.$loaded()
            .then(function() {
                $rootScope.currentUser = userObj;
            })
            .then(function() {
                console.log('registration.js: logged in user '+authData.uid);
                console.log($rootScope.currentUser);
                $location.path('/meetings');
            });
            
        })
        .catch(function(error) {
            $scope.message = error.toString();
        });
    } //login

    $scope.register = function() {
        Authentication.register($scope.user)
        .then(function(user){
            console.log('registration.js: registered user '+user.uid);
            Authentication.login($scope.user);
            $location.path('/meetings');
        })
        .catch(function(error) {
            $scope.message = error.toString;
        });
    } //register


    
    
}); //RegistrationController