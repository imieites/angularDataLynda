myApp.controller('MeetingsController', 
    function($scope, $firebase, $rootScope){
    
    var ref = new Firebase('https://attendancetestapp.firebaseio.com/meetings');
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
    
}); //MeetingsController