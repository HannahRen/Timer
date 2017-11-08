var app = angular.module('TimerApp', []);
app.controller('MainCtrl', function($scope, $interval) {
  $scope.breakLength = 1;
  $scope.sessionLength = 1;
  $scope.timeLeft = secondsToMins(60*$scope.sessionLength);
  $scope.fillHeight = '0%';
  $scope.sessionName = 'Session Time!';
  $scope.originalTime = $scope.sessionLength;

  var runTimer = false;
  var secs = 60 * $scope.originalTime;

  function secondsToMins(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    );
  }
  // Change default session length
  $scope.sessionLengthChange = function(time) {
    if (!runTimer){
        $scope.sessionLength += time;
        if ($scope.sessionLength < 1) {
           $scope.sessionLength = 1;}
        if ($scope.sessionName === 'Session Time!'){
        $scope.timeLeft = secondsToMins(60*$scope.sessionLength);
        $scope.originalTime = $scope.sessionLength;
        secs = 60 * $scope.originalTime;
      }
    }
  }
  // Change default break length
  $scope.breakLengthChange = function(time) {
    if (!runTimer){
      $scope.breakLength += time;
      if ($scope.breakLength < 1) {
        $scope.breakLength = 1;
      }
      if ($scope.sessionName === 'Break Time!') {
        $scope.timeLeft = secondsToMins(60*$scope.breakLength);
        $scope.originalTime = $scope.breakLength;
        secs = 60 * $scope.originalTime;
      }
    }
  }

  $scope.setBreak=function(){
    if(!runTimer){
      $scope.sessionName='Break Time!';
      $scope.timeLeft=secondsToMins(60*$scope.breakLength);
      $scope.originalTime = $scope.breakLength;
      secs = 60 * $scope.originalTime;
    }
  }

  $scope.setSession=function(){
    if(!runTimer){
      $scope.sessionName='Session Time!';
      $scope.timeLeft=secondsToMins(60*$scope.sessionLength);
      $scope.originalTime = $scope.sessionLength;
      secs = 60 * $scope.originalTime;
    }
  }

  $scope.toggleTimer = function() {
    if (!runTimer) {
      updateTimer();
      runTimer = $interval(updateTimer, 1000);
    } else {
      $interval.cancel(runTimer);
      runTimer = false;
    }
  }

  function updateTimer() {
    secs -= 1;
    if (secs < 0) {
      var wav = 'Time alarm.mp3';
      var audio = new Audio(wav);
			audio.play();
      // toggle break and session
      $scope.fillColor = '#d6d6c2';
      if ($scope.sessionName === 'Break Time!') {
        $scope.sessionName = 'Session Time!';
        $scope.originalTime = $scope.sessionLength;
      } else {
        $scope.sessionName = 'Break Time!';
        $scope.originalTime = $scope.breakLength;
      }
      $scope.timeLeft = secondsToMins(60 * $scope.originalTime);
      secs = 60 * $scope.originalTime;
    } else {
      if ($scope.sessionName === 'Break Time!') {
        $scope.fillColor = '#99cc00';
      } else {
        $scope.fillColor = '#ff6666';
      }
	    $scope.timeLeft = secondsToMins(secs);

      var full = 60 * $scope.originalTime;
      var perc = Math.abs((secs / full) * 100 - 100);
      $scope.fillHeight = perc + '%';
    }
  }

});
