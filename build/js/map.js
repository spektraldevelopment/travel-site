(function(window){
    "use strict";

    var Map = {}, ready = false, map, readyChecker;
    //
    Map.init = function(){
        var mapOptions = {
            center: { lat: 13.840658, lng: 104.741345 },
            zoom: 6
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
            
            var
                entryObj = {},
                latLong, desc = entry.description;

            latLong = JSON.parse(desc.substring(desc.indexOf("{"), desc.length))

            entryObj['title'] = entry.title;
            entryObj['description'] = desc.substring(0, desc.indexOf('{'));
            entryObj['lat'] = latLong.lat;
            entryObj['long'] = latLong.long;
            entryObj['url'] = entry.link;

            createMarker(entryObj);
            //console.log('Entry Object: ' + JSON.stringify(entryObj));
        });
    };

    function createMarker(obj){
        var latLng = new google.maps.LatLng(obj.lat, obj.long);

        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: obj.title,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5
            }
        });

        marker.setMap(map);
    }

    window.Map = Map;
}(window));