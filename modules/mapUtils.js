/** MAP UTILS module */
define(function() {
	return {
		// set travel time in marker's info window from user's position
		setMarkerTravelTime: function (origin, destination, infoWindow, marker) {
			this.travelTime(origin, destination, this.setMarkerTravelTimeCallback(infoWindow, marker));
		},
		setMarkerTravelTimeCallback: function (infoWindow, marker) {
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
		},
		// set travel time for timeslot's location from provided origin (previous timeslot or user's position)
		setTimeslotTravelTime: function (origin, destination, timeslot, sufficText) {
			this.travelTime(origin, destination, this.setTimeslotTravelTimeCallback(timeslot, sufficText));
		},
		setTimeslotTravelTimeCallback: function (timeslot, sufficText) {
			return function (response, status) {
	    		if (status != google.maps.DistanceMatrixStatus.OK) {
	    			alert('Error was: ' + status);
	  			} 
	  			else {	  				
    				for (var i = 0; i < response.originAddresses.length; i++) {
				      	var results = response.rows[i].elements;

				      	for (var j = 0; j < results.length; j++) {
				      		timeslot.find('.description').text(results[j].duration.text + sufficText);	// set travel time	
				      	}
			    	}			    	
	  			}
	    	}
		},
		// calculate travel time between 2 points and trigger callback
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
		markerIconByType: function (type) {
			switch (type) {
				case 'playground':
					return 'images/icon_playground_32.png';
				case 'museum':
					return 'images/icon_museum_32.png';
			}
		}
	}
});