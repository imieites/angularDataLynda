myApp.controller('RegistrationController', 
    function($scope, $firebaseAuth, $location){
    // uso $firebaseAuth en vez de SimpleLogin, que ya no se usa en las nuevas versiones.
    var ref = new Firebase('https://attendancetestapp.firebaseio.com/meetings');
    var authObj = $firebaseAuth(ref);

    $scope.login = function() {
        authObj.$authWithPassword({
            email: $scope.user.email,
            password: $scope.user.password
        })
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