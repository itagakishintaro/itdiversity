$(function() {
    $('#jq').jQCloud([]);
    jqdraw();
    // 入力ボタンクリック
    $("#comment-enter").on("click", jqdraw());
    // 地図
    var ymap = new Y.Map("map");
    searchLocation($('#map_detail').text(),ymap);

    function jqdraw() {
        var com = $("#comment-input").val();
        $("#comments").append('<div>' + com + '</div>');
        var comments = '';
        $("#comments div.comment").each(function(i, v) {
            console.log($(v).text());
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

    // 参加するボタンクリック
    $("#join").on("click", function() {
        var chk = $(this).prop('checked'),
            obj = $(this);
        (chk) ? obj.prop('disabled', false): obj.prop('disabled', true);
    });

    // 面白そうボタンクリック
    $("#like").on("click", function() {
        var count = Number($('.like-count').text());
        $('.like-count').empty();
        $(this).stop().animate({fontSize:'30rem'}, 300).animate({fontSize:'20rem'}, 300);
        setTimeout(function(){
          $('.like-count').text(count+1);
        } ,600);
    });
});