'use strict';

$(function() {
    new jBox('Tooltip', {attach: $('.blank')});
    // 面白そう設定
    setTopLikeCount();
});
var intervalID = setInterval(function(){
	$('.blank').stop().animate({
            backgroundColor: 'rgba(245,229,107,0.75);'
        }, 300).animate({
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
        }, 300);
    },1000);


$('.blank').hover(function(){
    clearInterval(intervalID);
});

$('.card .count').each(function(i, v){
	$(v).text(likeCounts[i]);
});

$("#input").hide();
$('#input-btn').on('click', function() {
    // $("#input").slideToggle();

});

$('.draggable').draggable({
    stop: function(){
        console.log('test');
        $(this).addClass('center');
    }
});
$('.droppable').droppable({
	drop: function( event, ui ) {
    	$(this).addClass( 'dropped' );
    	ui.draggable.removeClass('icon');
    	ui.draggable.addClass('big-img');
    },
    out: function( event, ui ) {
    	$(this).removeClass( 'dropped' );
    	ui.draggable.removeClass('big-img');
    	ui.draggable.addClass('icon');
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

function setTopLikeCount(){
	var count = 0;
	var target = $('#results').find('.count');
	$.each(target,function(){
		$(this).text(getTopLikeCount(count));
		count++;
	});
}

function getTopLikeCount(count){
	var co = getItem('count' + count );
	if( co === null ) return likeCounts[count];
	return co;
}
