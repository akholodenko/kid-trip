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
	      var hour = 12, ampm = 'am';

	      if(x == 0) hour = 12;
	      else if(x > 0 && x <= 12) {
	        hour = x; ampm = (hour == 12) ? 'pm' : 'am';
	      }
	      else {
	        hour = x - 12; ampm = (hour == 12) ? 'am' : 'pm';
	      }

	      // demo code for ACTIVE timeslot via random
	      var active = Math.floor((Math.random()*2)+1) == 1 ? 'active' : '';
	      var that = this;
	      $('#schedule').append("<div class='timeslot " + active + "' data-startHour='" + x + "'><div class='time'>" + hour + ":00" + ampm + "</div><div class='event'><div class='header'>Stretch timeslot</div><div class='description'>to extend event</div></div></div>");
	      $('#schedule .timeslot').resizable({ handles: "s", minHeight: this.timeslotMinHeight, grid: [ 0, this.timeslotAddHeight ], resize: function( event, uiObject ) {
	          var timeslots = that.timeslotHeight(uiObject);
	          var currentStartHour = uiObject.element.data('starthour');

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
	      });
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
	}
    }
});