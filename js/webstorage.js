'use strict';
// http://www.atmarkit.co.jp/ait/articles/1108/12/news093_2.html

if (typeof sessionStorage === 'undefined') {
    console.log("can not use webstorage");
} else {
    var storage = localStorage;
}

function store(json) {
    	json.forEach(function(v, i){
    		storage.setItem(v.key, v.value);
    	});
    }

    function view(key) {
        console.log( storage.getItem(key) );
    }
    
    function getItem(key){
    	return storage.getItem(key);
    }
    
    function setItem(key,value){
    	storage.setItem(key,value);
    }

    function remove(key) {
        storage.removeItem(key);
    }

    function removeAll() {
        storage.clear();
    }