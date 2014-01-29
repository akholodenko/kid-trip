/** MAP module */
define(["./data", "./mapUtils"], function(locationData, mapUtils) {	
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
		      	var circle = new google.maps.Circle({radius: 32000, center: results[0].geometry.location}); 
		      	map.fitBounds(circle.getBounds()); 

		      	// draw marker in center of map
		      	var youMarker = new google.maps.Marker({
		          	map: map,
		          	title: 'You\'re Here',
		          	position: results[0].geometry.location,
		          	animation: google.maps.Animation.DROP
		      	});     

		      	var infoWindow = new google.maps.InfoWindow({
		            	content: '---',
		            	maxWidth: 500
		      	});

			locationData.forEach(function(locationObject) {	      	
				var locationMarker = new google.maps.Marker({
			          	map: map,
			          	title: locationObject.title,
			          	position: new google.maps.LatLng(locationObject.lat, locationObject.lng),
			          	animation: google.maps.Animation.DROP,
			          	icon: 'images/icon_playground_32.png',
			          	id: locationObject.id // unique identifier for location
			      	});   

			      	google.maps.event.addListener(locationMarker, 'click', function() {
			        	infoWindow.setContent('');	// clear content from previous use
			        	mapUtils.setMarkerTravelTime(youMarker.getPosition(), locationMarker.getPosition(), infoWindow);

			        	infoWindow.setContent('<div class="location-info-title">' + locationMarker.get('title') + '</div>' + infoWindow.getContent());
			        	infoWindow.setPosition(locationMarker.getPosition());
			        	infoWindow.open(map, locationMarker);
			      	});   
		      	});

		      	google.maps.event.addListener(youMarker, 'click', function() {
			        infoWindow.setContent('You are here');
			        infoWindow.setPosition(youMarker.getPosition());
		        	infoWindow.open(map, youMarker);
			});       
		    }
		}
    	}
});