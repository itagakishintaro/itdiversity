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
	  convert.push({"text":this.surface,"weight":this.count});
	});
	return convert;
}

function setMap(mapobj,x,y){
  mapobj.drawMap(new Y.LatLng(x,y), 17, Y.LayerSetId.NORMAL);
}
