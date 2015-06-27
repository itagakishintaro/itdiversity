'use strict';

$("#input").hide();
$('#input-btn').on('click', function() {
    $("#input").slideToggle();
});

$('.draggable').draggable();
$('.droppable').droppable({
	drop: function( event, ui ) {
    	$( this ).addClass( "dropped" );
    }
});