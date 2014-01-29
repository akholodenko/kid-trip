/** MAP UTILS module */
define(function() {
	return {
		setMarkerTravelTime: function (origin, destination, infoWindow) {
			var callback = function (infoWindow) {
    				return function (response, status) {
		    			if (status != google.maps.DistanceMatrixStatus.OK) {
		    				alert('Error was: ' + status);
		  			} 
		  			else {
		    				//var origin = response.originAddresses;
		    				//var destination = response.destinationAddresses;
		    				for (var i = 0; i < response.originAddresses.length; i++) {
						      	var results = response.rows[i].elements;

						      	for (var j = 0; j < results.length; j++) {
						      		infoWindow.setContent(infoWindow.getContent() + '<div class="location-info-body"><span class="main">' + results[j].duration.text + ' away</span> (' + results[j].distance.text + ')</div>');
						      }
					    	}
		  			}
		    		}
    			};

			this.travelTime(origin, destination, callback(infoWindow));
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
    		}
	}
});