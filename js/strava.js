$(function(){
  var output = $('#output'),
      progress = $('progress'),
      athlete = 76426,
      proxyURL = 'proxy.php?url=',
      ridesIndexURL = 'http://www.strava.com/api/v1/rides?athleteId=',
      ridesShowURL = 'http://www.strava.com/api/v1/rides/';

  $('button').click(function(){
    loadRides();
  });

  function loadRides(){
    var rides = [];
    $.getJSON(proxyURL + ridesIndexURL + athlete,
      function(data){
        var l = data.rides.length, i=0;
        progress.attr('max', l);
        for(;i<l;i++){
          $.getJSON(proxyURL + ridesShowURL + data.rides[i].id,
            function(data){
              rides.push(data.ride);
              progress.val(rides.length);
              if(rides.length == l){
                displayRides(rides);
                progress.val(0);
              }
            }
          );
        }
      }
    );
  }

  function displayRides(rides){
    var i=0, l=rides.length, ride,
        out = ["Name, Start, Duration, Distance"];
    for(;i<l;i++){
      ride = rides[i];
      out.push(ride.name.replace(/,/g, '') + ", " + (new Date(ride.startDate)).toLocaleString() + ", " + ride.elapsedTime + ", " + ride.distance);
    }
    output.html(out.join("<br>\n"));
  }
});