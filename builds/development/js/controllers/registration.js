myApp.controller('RegistrationController', 
    function($scope, $firebaseAuth, $location, Authentication, $rootScope){
    

    $scope.login = function() {
        Authentication.login($scope.user)
        .then(function(user){
            console.log('registration.js: logged in user '+user.uid);
            $location.path('/meetings');
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