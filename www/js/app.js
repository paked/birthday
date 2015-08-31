// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// MainCtrl is quite literally the main controller
app.controller('MainCtrl', ['$scope', '$http', '$ionicPopup', function($scope, $http, $ionicPopup) {
    // This is the message that initially shows when you open the app
    $scope.message = "Your information will appear here when you click that big yellow button";
    // A boolean for whether the scope has changed
    $scope.changed = false; 
    // A variable which is used to tell whether to show the loading icon or not
    $scope.fetching = false;
    
    // go is a function to get a fact from http://numbersapi.com to do with the date the user has selected
    $scope.go = function() {
        // Check that the date is __partially__ valid.
        var day = $scope.day;
        var month = $scope.month;

        if (day > 31 || month > 12) {
           $ionicPopup.alert({
               title: 'Uh Oh!',
               content: 'That isn\'t a valid day!'
           }).then(function(res) {
               console.log('Test Alert Box');
           }); 

           return;
        }

        // We are fetching data, show loader
        $scope.fetching = true;
        
        // Make a HTTP request to get the relevant information for that day
        $http.get('http://numbersapi.com/' + month + '/' + day + '/date')
            .then(function(resp) {
                // Set the message to the HTTP response
                $scope.message = resp.data;
                // We are no longer fetching, hide loader
                $scope.fetching = false;
                // The text has been changed; stop greying it out
                $scope.changed = true;
            });
    }
}]);
