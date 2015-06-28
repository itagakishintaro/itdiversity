$(function() {
    $('.like-count').text(likeCounts[getQuerystring('id')]);
    // ページ内容設定
    setPageContents();
    // コメント設定
    initializeCommnet();
    // 面白そう数設定
    getLikeCount();
    $('#jq').jQCloud([]);
    jqdraw();
    // 入力ボタンクリック
    $("#comment-enter").on("click", jq);

    function jq() {
        jqappend();
        jqdraw();
    }
    $("#comment-enter").on("click", jqdraw());
    // 地図
    var ymap = new Y.Map("map");
    searchLocation($('#map_detail').text(),ymap);

    function jqdraw() {
        var comments = '';
        $("#comments div.comment").each(function(i, v) {
            comments += ($(v).text() + ' ');
        });
        if(comments === '') return;
        $.ajax({
            url: 'http://jlp.yahooapis.jp/MAService/V1/parse',
            data: createParamJSON(comments),
            type: 'GET',
            dataType: "xml",
            cache: false, // キャッシュOFF
            // データのロード完了時の処理
            success: function(xmlLikeText) {
                xmlLikeText = xmlLikeText.responseText;
                xml = xmlLikeText.replace("<html><head/><body>", '<?xml version="1.0" encoding="UTF-8" ?>').replace("</body></html>", "");
                // ↑ここまでで変数xmlの中にXML（の構造を持った）テキストが入っている

                // JSONに変換する場合、更に追加で処理
                var json = $.xml2json(xml);
                $('#jq').jQCloud('update', convertjQCloudJSON(json));
            }
        });
        $("#comment-input").val('');
    }

    function jqappend() {
        var com = $("#comment-input").val();
        if (com === '') return;

        var now = new XDate().toString('yyyy/MM/dd hh:mm');
        // ローカルストレージに保存
        saveComment(now,"板垣真太郎",com);
        var html = `
          <div>
              <span class="time">${now}</span>
              <span class="name">板垣真太郎</span>
              <div class="comment margin-b-sm">${com}</div>
          </div>
        `;

        $("#comments").append(html);
    }

    // 参加するボタンクリック
    $("#join").on("click", function() {
        console.log('clicked');
        $('.bubble').show(500);
        setTimeout(function() {
            $('.bubble').hide(1000);
        }, 1500);
    });

    // 面白そうボタンクリック
    $("#like, .like-count").on("click", function() {
        var count = Number($('.like-count').text());
        setLikeCount(count+1);
        $('.like-count').empty();
        $('#like').stop().animate({
            fontSize: '30rem'
        }, 300).animate({
            fontSize: '20rem'
        }, 300);
        setTimeout(function() {
            $('.like-count').text(count + 1);
        }, 600);
    });
});

// http://vba-geek.jp/blog-entry-183.html
function getQuerystring(key, default_)  
{  
   if (default_==null) default_="";  
   key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
   var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");  
   var qs = regex.exec(window.location.href);  
   if(qs == null)  
    return default_;  
   else  
    return qs[1];  
}

function setPageContents(){
	var pContents = detailLists[getQuerystring('id')];
	// タイトル
	$('#titleDetail').text(pContents.title);
	// 日時設定
	setEventDate($('#dateDetail'),moment(pContents.fromDate),moment(pContents.toDate));
	// 場所設定
	$('#map_detail').html(pContents.place);
	// 内容
	$('#descriptionDetail').html(pContents.contents);
}

/**
 * momentの日付をtargetに表示する
 * @param target 表示対象のdiv
 * @param fromDate 開始日時
 * @param toDate 終了日時
 */
function setEventDate(target,fromDate,toDate){
	var f = "YYYY年MM月DD日 HH時mm分";
	var ffDate = fromDate.format(f);
	var ftDate = toDate.format(f);
	target.text(ffDate + " ～ " + ftDate);
}

/**
 * コメント設定
 *
 *
 */
function initializeCommnet(){
  var com = JSON.parse(getItem(getQuerystring("id")));
  if( com === null ) return;
  setComments(com.comments);
}

function setComments(commentArray){
	$.each(commentArray,function(){
		var com = $(this)[0];
		$('#comments').append(
		'<div><span class="time">' + com.date +
		'</span><span class="name">&nbsp;' + com.name + 
		'</span><div class="comment margin-b-sm">' + com.comment + 
		'</div></div>');
	});
}

function saveComment(now,user,com){
	var localComment = getItem(getQuerystring("id"));
	if( localComment === null ){
		localComment = {comments:[]};
	}
	else{
		localComment = JSON.parse(localComment);
	}
	localComment.comments.push({
		date:now,
		name:"板垣真太郎",
		comment:com
	});
	setItem(getQuerystring('id'),JSON.stringify(localComment));
}

function getLikeCount(){
	var id = getQuerystring('id');
	var likeCount = getItem('count' + id);
	if( likeCount === null ){
		likeCount = likeCounts[id];
	}
	$('.like-count').text(likeCount);
}

function setLikeCount(count){
	setItem('count' + getQuerystring('id'),count);
}