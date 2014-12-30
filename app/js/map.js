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
        var pathArr = [];
        arr.forEach(function(entry, index){

            var
                entryObj = {}, latLng,
                coordinates, desc = entry.description;

            coordinates = JSON.parse(desc.substring(desc.indexOf("{"), desc.length))

            entryObj['title'] = entry.title;
            entryObj['description'] = desc.substring(0, desc.indexOf('{'));
            entryObj['lat'] = coordinates.lat;
            entryObj['long'] = coordinates.long;
            entryObj['url'] = entry.link;

            if (index === (arr.length - 1)) {
                entryObj['mostRecent'] = true;
            } else {
                entryObj['mostRecent'] = false;
            }

            latLng = new google.maps.LatLng(coordinates.lat, coordinates.long);
            pathArr.push(latLng);

            createMarker(entryObj);
        });

        createPath(pathArr);
    };

    function createMarker(obj){
        var
            marker, latLng = new google.maps.LatLng(obj.lat, obj.long),
            goldStar, markerColour = '#000';

        goldStar = {
            //path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
            path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
            fillColor: '#eaea46',
            fillOpacity: 1,
            scale: 0.2,
            strokeColor: '#ffc100',
            strokeWeight: 1,
            anchor: new google.maps.Point(100,150)
        };

        if (obj.mostRecent === true) {
            marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: obj.title,
                animation: google.maps.Animation.DROP,
                icon: goldStar
            });
        } else {
            marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: obj.title,
                animation: google.maps.Animation.DROP,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 5,
                    strokeColor:  markerColour
                }
            });
        }

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' + obj.title + '</h1>'+
            '<div id="bodyContent">'+
            '<p>' + obj.description + '</p>'+
            '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function() {
//            map.setZoom(10);
//            map.setCenter(marker.getPosition());
            infowindow.open(map,marker);
        });

        marker.setMap(map);

        if (obj.mostRecent === true) {
            map.setZoom(10);
            map.panTo(latLng);
        }
    }

    function createPath(arr){
        var lineSymbol = {
            path: 'M 0,-1 0,1',
            strokeOpacity: 0.5,
            scale: 4
        };

        var path = new google.maps.Polyline({
            path: arr,
            geodesic: true,
            strokeOpacity: 0,
            icons: [{
                icon: lineSymbol,
                offset: '0',
                repeat: '20px'
            }],
            map: map
        });

        path.setMap(map);
    }

    window.Map = Map;
}(window));