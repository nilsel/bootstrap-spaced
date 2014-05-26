/*
*	Change background based on time of day
*/

$(document).ready(function(){

	var date = new Date();
	var current_hour = date.getHours();
	/* yes we coulda, shoulda, wouda used a switch here */
	if(current_hour > 0){
		$("body").removeClass().addClass("night-sky");
	}
	if(current_hour > 5){
		$("body").removeClass().addClass("blue-sky");
	}
	if(current_hour > 18){
		$("body").removeClass().addClass("evening-sky");
	}
	if(current_hour > 20){
		$("body").removeClass().addClass("night-sky");
	}

});