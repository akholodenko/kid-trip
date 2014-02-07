/** DATA module */
define(function () {
    return {
    	activityTimeByType: {
    		'playground': {
    			type: 'playground',
    			time: 60 // in minutes
    		},
    		'museum': {
    			type: 'museum',
    			time: 120
    		},
    		'park': {
    			type: 'park',
    			time: 120
    		}
    	},
    	locationData: [
    		{
		    	id: 1,
				title: 'Washington Park',
		  		lat: 37.5817245,
		  		lng: -122.3426732,
		  		type: 'playground'
			},
			{
				id: 2,
				title: 'Central Park',
		  		lat: 37.5607982,
		  		lng: -122.3234643,
		  		type: 'playground'
			},
			{
				id: 3,
				title: 'Dolores Park Playground',
				lat: 37.7581932,
				lng: -122.4271466,
		  		type: 'playground'
			},
			{
				id: 4,
				title: 'Peter Loftus Playground',
				lat: 37.6000499,
				lng: -122.4010465,
		  		type: 'playground'
			},
			{
				id: 5,
				title: 'Hiller Aviation Museum',
				address: {
					street: '601 Skyway Rd',
					city: 'San Carlos',
					state: 'CA',
					zipcode: '94070'
				},
				lat: 37.5126849,
				lng: -122.2528128,
		  		type: 'museum'
			}
		]
	}
});