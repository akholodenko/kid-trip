/** MAP UTILS module */
define(function() {
	return {
		setMarkerTravelTime: function (origin, destination, infoWindow, marker) {
			this.travelTime(origin, destination, this.travelTimeCallback(infoWindow, marker));
		},
		// calculate travel time between 2 points and update marker's inforWindow with result		
		travelTime: function (origin, destination, callback) {
			var service = new google.maps.DistanceMatrixService();
  			service.getDistanceMatrix({
      				origins: [origin],
      				destinations: [destination],
			      	travelMode: google.maps.TravelMode.DRIVING,
			      	unitSystem: google.maps.UnitSystem.IMPERIAL,
			      	avoidHighways: false,
			      	avoidTolls: false
    			}, callback);
		},
		travelTimeCallback: function (infoWindow, marker) {
			return function (response, status) {
	    		if (status != google.maps.DistanceMatrixStatus.OK) {
	    			alert('Error was: ' + status);
	  			} 
	  			else {
    				//var origin = response.originAddresses;
    				//var destination = response.destinationAddresses;
    				var addButton = '<div class="location-info-add-button">ADD</div>';
    				for (var i = 0; i < response.originAddresses.length; i++) {
				      	var results = response.rows[i].elements;

				      	for (var j = 0; j < results.length; j++) {
				      		// set text in info window pop up
				      		infoWindow.setContent(infoWindow.getContent() + '<div class="location-info-body"><span class="main">' + results[j].duration.text + ' away</span> (' + results[j].distance.text + ')</div>' + addButton);

				      		// set data in marker object
				      		marker.set('duration', results[j].duration);	// set time ( { value:'', text:''} )
				      		marker.set('distance', results[j].distance);	// set distance ( { value:'', text:''} )
				      	}
			    	}
	  			}
	    	}
		}
	}
});