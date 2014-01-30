/** PANEL module */
define(function () {
    return {
        color: "black",
        size: "unisize",
        panelWidth: 303,
  		timeslotMinHeight: 37, 
  		timeslotAddHeight: 58,
  		hours: { startHour: 8, endHour: 20},
  		// display / size schedule panel
	  	render: function () {
	    		this.renderDay(this.hours.startHour, this.hours.endHour);
	    		this.resize();
	  	},
	        // resize panel schedule height
	  	resize: function () {
	    	var scheduleHeight = Math.floor((($(window).height() - 72) / $(window).height()) * 100);
	    	//console.log($('#panel #title').height());
	    	//console.log(scheduleHeight);
	    	$('#panel #schedule').height(scheduleHeight + '%');
	  	},  	  	
		// display all time slots for day
		renderDay: function (startHour, endHour) {
			if(startHour === undefined) startHour = 0;
		    if(endHour === undefined) endHour = 24;

		    for(var x = startHour; x <= endHour; x++) {
		      	// demo code for ACTIVE timeslot via random
		      	var active = Math.floor((Math.random()*2)+1) == 1 ? 'active' : '';
		      	$('#schedule').append("<div class='timeslot " + active + "' data-startHour='" + x + "'><div class='time'>" + this.getPrettyTime(x) + "</div><div class='event'><div class='header'>Stretch timeslot</div><div class='description'>to extend event</div></div></div>");

				// define SORTABLE functionality
		      	$('#schedule').sortable({ axis: "y", placeholder: "ui-state-highlight", update: this.timeslotSortCallback(this)});

		      	// define RESIZABLE functionality
		      	$('#schedule .timeslot').resizable({ handles: "s", minHeight: this.timeslotMinHeight, grid: [ 0, this.timeslotAddHeight ], resize: this.timeslotResizeCallback(this)});
		    }
		},
		timeslotSortCallback: function (that) {
			return function( event, uiObject ) {
				//console.log('updated timeslot position');
				//console.log('item: ' + uiObject.item.attr('data-starthour'));
				console.log('between: ' + uiObject.item.prev().attr('data-starthour') + ' and ' + uiObject.item.next().attr('data-starthour'));

				var currentHour = parseInt(uiObject.item.attr('data-starthour'));
				var previousHour = parseInt(uiObject.item.prev().attr('data-starthour'));
				var nextHour = parseInt(uiObject.item.next().attr('data-starthour'));
				
				// timeslot is moved down
				if(currentHour < nextHour || isNaN(nextHour)) {					
					// update all timeslots above for new values
					for(var count = that.hours.startHour; count <= previousHour; count++) {						
						// skip shifting timeslots above one that was moved down
						if(count < currentHour) 
							continue;	

						// shift all timeslots above 1 spot up					
						if($('#schedule .timeslot[data-starthour=' + (count) + ']').length) {
							$('#schedule .timeslot[data-starthour=' + (count) + ']').find('.time').text(that.getPrettyTime(count - 1));	// first update text
							$('#schedule .timeslot[data-starthour=' + (count) + ']').attr('data-starthour', count - 1);	// then change index (hour) of timeslot							
						}
						else
							break;
					}

					// update timeslot for new value
					uiObject.item.find('.time').text(that.getPrettyTime(previousHour));
					uiObject.item.attr('data-starthour', previousHour);					
				}
				// timeslot is moved up
				else if(currentHour > nextHour) {
					// update all timeslots above for new values					
					for(var count = that.hours.endHour; count >= nextHour; count--) {
						if(count > currentHour)
							continue;

						// shift all timeslots below 1 spot down	
						if($('#schedule .timeslot[data-starthour=' + (count) + ']').length) {
							$('#schedule .timeslot[data-starthour=' + (count) + ']').find('.time').text(that.getPrettyTime(count + 1));	// first update text
							$('#schedule .timeslot[data-starthour=' + (count) + ']').attr('data-starthour', count + 1);	// then change index (hour) of timeslot							
						}
						else
							break;
					}
					
					// update timeslot for new value
					uiObject.item.find('.time').text(that.getPrettyTime(nextHour));
					uiObject.item.attr('data-starthour', nextHour);		
				}
		    }
		},
		// callback for resized timeslot (via closures)
		timeslotResizeCallback: function (that) {
			return function(event, uiObject) {
			    var timeslots = that.timeslotHeight(uiObject);
			    var currentStartHour = parseInt(uiObject.element.attr('data-starthour'));

			    if(timeslots > 1) {
			    	// loop through and hide all timeslots covered by current expansion
					for(var count = 1; count < timeslots; count++) {
						$('#schedule .timeslot[data-starthour=' + (currentStartHour + count) + ']').css({display: 'none'});
			        }

			            // show hidden timeslot as current timeslot shrinks
					$('#schedule .timeslot[data-starthour=' + (currentStartHour + timeslots) + ']').css({display: 'block'});
				}              
				else if(timeslots == 1) {
			        //console.log('current + slots: ' + currentStartHour + timeslots);
			        // make sure to show the next timeslot
			        $('#schedule .timeslot[data-starthour=' + (currentStartHour + timeslots) + ']').css({display: 'block'});
				}
			}
		},
		// calculate number of timeslots resized slot covers
	  	timeslotHeight: function (uiObject) {
		    if(uiObject.size.height == this.timeslotMinHeight) {
		      return 1;
		    }
		    else if (uiObject.size.height > this.timeslotMinHeight) {
		      	return ((uiObject.size.height - this.timeslotMinHeight) / this.timeslotAddHeight) + 1;  // divide height by number of slot heights + 1 for original slot
		    }
		},
		getPrettyTime: function (x) {
			var hour = 12, ampm = 'am';

		    if(x == 0) hour = 12;
		    else if(x > 0 && x <= 12) {
			    hour = x; ampm = (hour == 12) ? 'pm' : 'am';
			}
		    else {
		       	hour = x - 12; ampm = (hour == 12) ? 'am' : 'pm';
		    }

		    return hour + ':00' + ampm;
		}
    }
});