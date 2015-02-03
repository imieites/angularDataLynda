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
        $location.path('/meetings');
    } //register
    
}); //RegistrationController