myApp.controller('RegistrationController', 
    function($scope, $firebaseAuth, $location, Authentication, $rootScope){
    

    $scope.login = function() {
        console.log('registration.js: logging in')
        Authentication.login($scope.user)
        .then(function(user){
            $location.path('/meetings');
        })
        .catch(function(error) {
            $scope.message = error.toString;
        });
    } //login

    $scope.register = function() {
        console.log('registration.js: registering user')
        Authentication.register($scope.user)
        .then(function(user){
            Authentication.login($scope.user);
            $location.path('/meetings');
        })
        .catch(function(error) {
            $scope.message = error.toString;
        });
    } //register


    
    
}); //RegistrationController