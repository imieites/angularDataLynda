myApp.controller('MeetingsController', 
    function($scope, $firebase, $rootScope, FIREBASE_URL, $firebaseAuth){
    
    var ref = new Firebase(FIREBASE_URL);
    var authObj = $firebaseAuth(ref);
    var authData = authObj.$getAuth();

    if(authData == null){
        console.log('meetings.js: no user data available');
    }
    else { // there's a user logged in
        var ref = new Firebase(FIREBASE_URL + 'users/' + authData.uid + '/meetings');

        var meetingsInfo = $firebase(ref);
        var meetingsObj = $firebase(ref).$asObject();    
        var meetingsArray = $firebase(ref).$asArray();

        meetingsObj.$loaded().then(function(data){
            $scope.meetings = meetingsObj;
            console.log('meetings.js: $scope.meetings set to...');
            console.log($scope.meetings);
        }); // meetingsObj loaded

        meetingsArray.$loaded().then(function(data){
            $rootScope.howManyMeetings = meetingsArray.length;
        }); // meetingsArray loaded

        meetingsArray.$watch(function(event){
            $rootScope.howManyMeetings = meetingsArray.length;
        }); // meetingsArray watch

        $scope.addMeeting = function(){

            meetingsInfo.$push({
                name: $scope.meetingname,
                date: Firebase.ServerValue.TIMESTAMP
            }).then( function() {
                $scope.meetingname= '';
            })
        } // addMeeting

        $scope.deleteMeeting = function(key){
            meetingsInfo.$remove(key);
        }
    }
    
}); //MeetingsController