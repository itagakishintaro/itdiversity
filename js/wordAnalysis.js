/*
URLの例
http://jlp.yahooapis.jp/MAService/V1/parse?appid=dj0zaiZpPW50Q3BhMUJhZDNGWiZzPWNvbnN1bWVyc2VjcmV0Jng9Y2M-&results=uniq&filter=1|2|3|9|10&response=surface&sentence=%E5%BA%AD%E3%81%AB%E3%81%AF%E4%BA%8C%E7%BE%BD%E3%83%8B%E3%83%AF%E3%83%88%E3%83%AA%E3%81%8C%E3%81%84%E3%82%8B%E3%81%97%E3%80%81%E6%A5%BD%E3%81%97%E3%81%84%EF%BC%81%EF%BC%81%E3%81%8A%E3%81%AF%E3%82%88%E3%81%86%E6%A5%BD%E3%81%97%E3%81%84%E3%80%82
*/

var MAServiceURL = "http://jlp.yahooapis.jp/MAService/V1/parse";
var appid = "dj0zaiZpPW50Q3BhMUJhZDNGWiZzPWNvbnN1bWVyc2VjcmV0Jng9Y2M-";
var results = "uniq"; // 出現頻度情報
var filter = "1|2|3|9|10"; // 形容詞、形容動詞、感動詞、名詞、動詞
var response = "surface"; // 表記名のみ

/*
    1 : 形容詞
    2 : 形容動詞
    3 : 感動詞
    4 : 副詞
    5 : 連体詞
    6 : 接続詞
    7 : 接頭辞
    8 : 接尾辞
    9 : 名詞
    10 : 動詞
    11 : 助詞
    12 : 助動詞
    13 : 特殊（句読点、カッコ、記号など）
*/

function createParamJSON(sentence){
  return {
    "appid":appid,
    "results":results,
    "response":response,
    "filter":filter,
    "sentence":sentence
  };
}

function convertjQCloudJSON(json){
	var convert = [];
	var wList = json.uniq_result.word_list.word;
	$.each(wList,function(){
	  convert.push({text: this.surface, weight: Number(this.count)});
	});
	return convert;
}

function setMap(mapobj,location){
  mapobj.drawMap(location,17, Y.LayerSetId.NORMAL);
}

/**
 * 住所から位置情報を検索し、マップを表示する
 * @param address 住所
 * 
 */
function searchLocation(address,mapobj){
  $.ajax({
            url: 'http://geo.search.olp.yahooapis.jp/OpenLocalPlatform/V1/geoCoder',
            data: createParamJSONForLocation(address),
            type: 'GET',
            dataType: "xml",
            cache: false, // キャッシュOFF
            // データのロード完了時の処理
            success: function(xmlLikeText) {
              xmlLikeText = xmlLikeText.responseText;
           xml = xmlLikeText.replace("<html><head/><body>", '<?xml version="1.0" encoding="UTF-8" ?>').replace("</body></html>", "").replace("<html><head><style/></head><body>","");
             var json = $.xml2json(xml);
             var location = convertLocation(json);
             //var marker = new Y.Marker(location);
			//	 mapobj.addFeature(marker);
             setMap(mapobj,location);
            }
        });
}

/**
 * 住所を設定し、yahooApiのJSONパラメータを作成する
 * @param address 住所
 * @return パラメータ(JSON)
 */
function createParamJSONForLocation(address){
  return {
    "appid":appid,
    "results":1,
    "output":'xml',
    "query":address
  };
}

/**
 * yhoooの住所検索レスポンスを位置情報に変換
 * @param json 住所検索レスポンス(JSON)
 * @return 位置クラス
 */
function convertLocation(json){
	var location = json.feature.geometry.coordinates;
	var locationArray = location.split(',');
	return new Y.LatLng(parseFloat(locationArray[1]),parseFloat(locationArray[0]));
}
