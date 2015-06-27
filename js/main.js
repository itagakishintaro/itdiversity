'use strict';

$("#input").hide();
$('#input-btn').on('click', function() {
    // $("#input").slideToggle();

});

$('.draggable').draggable();
$('.droppable').droppable({
	drop: function( event, ui ) {
    	$(this).addClass( 'dropped' );
    	console.log(ui.draggable);
    	ui.draggable.addClass('big-img');
    },
    out: function( event, ui ) {
    	$(this).removeClass( 'dropped' );
    	ui.draggable.removeClass('big-img');
    }
});

var content = `
	<div id="input">
		<div id="input-icon"></div>
		<div id="input-icon-selected"></div>
		<input id="input-title" class="form-control" placeholder="タイトル"></input>
		<div id="input-image"></div>
		<input id="input-date" class="form-control" placeholder="日時"></input>
		<input id="input-place" class="form-control" placeholder="場所"></input>
		<textarea id="input-description" class="form-control" rows="10" placeholder="ルールなどの説明"></textarea>
		<button id="create" class="btn btn-info">アイディア登録</button>
	</div>
`;

new jBox('Modal', {
    width: 800,
    height: 400,
    attach: $('#myModal'),
    title: '登録画面',
    content: content
});