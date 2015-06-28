$(function() {
    $('.like-count').text(likeCounts[getQuerystring('id')]);

    $('#jq').jQCloud([]);
    jqdraw();
    // 入力ボタンクリック
    $("#comment-enter").on("click", jq);

    function jq() {
        jqappend();
        jqdraw();
    }

    function jqdraw() {
        var comments = '';
        $("#comments div.comment").each(function(i, v) {
            comments += ($(v).text() + ' ');
        });
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