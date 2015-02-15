myApp.controller('CheckinsController', 
    function($scope, $firebase, $rootScope, FIREBASE_URL, $firebaseAuth, $routeParams, $location){

    $scope.whichMeeting = $routeParams.mId;
    $scope.whichUser = $routeParams.uId;

    var ref = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + 
        '/meetings/' + $scope.whichMeeting + '/checkins');
    var checkinsList =  $firebase(ref).$asArray();
    $scope.checkins = checkinsList;

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
            $location.path('/checkins/' + $scope.whichUser + '/' + $scope.whichMeeting + '/checkinsList');
        }); // data sent
    } //addCheckin

    $scope.deleteCheckin = function(id){
        var record = $firebase(ref); // apunta a la lista de checkins para esa meeting
        record.$remove(id);
    } //deleteCheckin

}); //CheckinsController