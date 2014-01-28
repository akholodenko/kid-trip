/** MAP module */
define(function () {
    return {
    	geocode: function (address) {
    		// use geocoder to find longitute/latitude location of current address
    		var geocoder = new google.maps.Geocoder();
    		geocoder.geocode({ 'address': address }, this.render);
    	},
        resize: function (panelWidth) {
      		$('#map-canvas').width($(window).width() - panelWidth); // resize map
  	},
  	 // callback to geocode lookup for lat/long of location
  	render: function (results, status) {
	    var map;

	    // upon successful address to lat/long resolution
	    if (status == google.maps.GeocoderStatus.OK) {      
	      // basic map options
	      var mapOptions = {
	          center: results[0].geometry.location, // center map on resolved geolocation
	          mapTypeId: google.maps.MapTypeId.ROADMAP  // default map is classic map
	      }

	      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	      // zoom map to be within radius of circle (zoom based on distance, not present number)
	      var circle = new google.maps.Circle({radius: 16000, center: results[0].geometry.location}); 
	      map.fitBounds(circle.getBounds()); 

	      // draw marker in center of map
	      var marker = new google.maps.Marker({
	          map: map,
	          title: 'You\'re Here',
	          position: results[0].geometry.location,
	          animation: google.maps.Animation.DROP
	      });     

	      // add Burlingame playground
	      var washingtonParkMarker = new google.maps.Marker({
	          map: map,
	          title: 'Washington Park',
	          position: new google.maps.LatLng(37.5817245,-122.3426732),
	          animation: google.maps.Animation.DROP,
	          icon: 'images/icon_playground_32.png',
	          id: 57 // unique identifier for location
	      });     

	      var infoWindow = new google.maps.InfoWindow({
	            content: 'demo',
	            maxWidth: 500
	        });

	      google.maps.event.addListener(marker, 'click', function() {
	        infoWindow.setContent('You are here');
	        infoWindow.setPosition(marker.getPosition());
	        infoWindow.open(map,marker);
	      });     

	      google.maps.event.addListener(washingtonParkMarker, 'click', function() {
	        console.log(washingtonParkMarker.get('title') + ' (' + washingtonParkMarker.get('id') + ')');

	        infoWindow.setContent(washingtonParkMarker.get('title'));
	        infoWindow.setPosition(washingtonParkMarker.getPosition());
	        infoWindow.open(map,washingtonParkMarker);
	      });     
	    }
	  }
    }
});