(function(window){
    "use strict";

    var Map = {}, ready = false, map, readyChecker;

    Map.init = function(){
        var mapOptions = {
            center: { lat: 22.275849, lng: 114.172377 },
            zoom: 12
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        ready = true;
        console.log('Map init');
    };

    Map.onReady = function(callback){
        if (ready === true) {
            callback();
        } else {
            readyChecker = setInterval(function(){
                if (ready === true) {
                    clearInterval(readyChecker);
                    callback();
                }
            }, 500);
        }
    };

    Map.setData = function(arr) {
        arr.forEach(function(entry){
//            console.log('title: ' + entry.title);
//            console.log('description: ' + entry.description);
//            console.log('link' + entry.link);

            var latLong, desc = entry.description;

            latLong = desc.substring(1, desc.length - 1);

            console.log('latLong: ' + latLong);
        });
    };

    window.Map = Map;
}(window));