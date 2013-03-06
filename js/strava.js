$(function(){
  var output = $('#output'),
      progress = $('progress'),
      athlete = 76426,
      ridesIndexURL = 'http://www.strava.com/api/v1/rides?athleteId=',
      ridesShowURL = 'http://www.strava.com/api/v1/rides/';

  $('button').click(function(){
    loadRides();
  });

  function loadRides(){
    var rides = [];
    $.get(ridesIndexURL + athlete, function(data){
      var l = data.rides.length, i=0;
      progress.attr('max', l);
      for(;i<l;i++){
        $.get(ridesShowURL + data.rides[i].id, function(data){
          rides.push(data.ride);
          progress.val(rides.length);
          if(rides.length == l){
            displayRides(rides);
          }
        });
      }
    });
  }

  function displayRides(rides){
    var i=0; l=rides.length, ride,
        out = ["Name, Start, Duration, Distance"];
    for(;i<l;i++){
      ride = rides[i];
      out.push(ride.name + ", " + ride.startDate + ", " + ride.elapsedTime + ", " + ride.distance);
    }
    output.html(out.join("<br>\n"));
  }
});