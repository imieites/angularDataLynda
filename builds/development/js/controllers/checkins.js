myApp.controller('CheckinsController', 
    function($scope, $firebase, $rootScope, FIREBASE_URL, $firebaseAuth, $routeParams, $location){

    $scope.whichMeeting = $routeParams.mId;
    $scope.whichUser = $routeParams.uId;
    
    // estos 2 son valores default para la checking list form
    $scope.order="firstname";
    $scope.direction="";

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

    $scope.pickRandom = function() {
        var whichRecord = Math.round(Math.random() * checkinsList.length);
        $scope.recordId = checkinsList.$keyAt(whichRecord);
    } //pickRandom

    $scope.showLove = function(item){
        item.show = !item.show;

        if(item.userState == 'expanded'){
            item.userState = '';
        } else {
            item.userState = 'expanded';
        }
    } //showLove

    $scope.giveLove = function(item, giftText){
        var refLove = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + 
        '/meetings/' + $scope.whichMeeting + '/checkins/' + item.$id + '/awards');
        var checkinsObj = $firebase(refLove);

        var myData = {
            name: giftText,
            date: Firebase.ServerValue.TIMESTAMP
        };

        checkinsObj.$push(myData);

    } //giveLove

    $scope.deleteLove = function(checkinId, award){
        var refLoveDel = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + 
        '/meetings/' + $scope.whichMeeting + '/checkins/' + checkinId + '/awards');
        var checkinsObj = $firebase(refLoveDel);

        checkinsObj.$remove(award);
    } //deleteLove


}); //CheckinsController