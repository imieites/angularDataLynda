myApp.controller('CheckinsController', 
    function($scope, $firebase, $rootScope, FIREBASE_URL, $firebaseAuth, $routeParams){

    $scope.whichMeeting = $routeParams.mId;
    $scope.whichUser = $routeParams.uId;

    var ref = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + 
        '/meetings/' + $scope.whichMeeting + '/checkins');

    $scope.addCheckin = function(){
        var checkinsObj = $firebase(ref);

        var myData = {
            // esto de usar un valor en el scope está MAL.
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email,
            date: Firebase.ServerValue.TIMESTAMP
        };

        checkinsObj.$push(myData).then(function(){
            // set to out list of checkins page
        }); // data sent
    } //addCheckin


}); //CheckinsController