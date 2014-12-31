(function(window){
    "use strict";

    var
        Map = {}, ready = false, map, readyChecker,
        SEA_MAP_ID = 'custom_style',
        colourMarkerOutline = '#2b3a42',
        colourMarkerFill = '#ff530d',
        colourPath = '#000',
        colourStarOutline = '#2b3a42',
        colourStarFill = '#ff530d',
        colourLand = '#8AB833',
        colourWater = '#006D8D',
        colourHighway = '#32331d',
        colourArterial = '#d0a825',
        colourLocal = '#ff2d00',
        colourTransit = '#04756f',
        colourAdmin = '#f2385a';

    Map.init = function(){

        var featureOpts = [
            {
                stylers: [
                    { hue: colourLand },
                    { visibility: 'simplified' },
                    { gamma: 0.5 },
                    { weight: 0.5 }
                ]
            },
            {
                elementType: 'labels',
                stylers: [
                    { visibility: 'on' }
                ]
            },
            {
                featureType: 'water',
                stylers: [
                    { color: colourWater }
                ]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [
                    { hue: colourHighway },
                    { saturation: 10 },
                    { lightness: -25 },
                    { weight: 2 }
                ]
            },{
                featureType: 'road.arterial',
                elementType: 'all',
                stylers: [
                    { hue: colourArterial },
                    { lightness: -40 },
                    { visibility: 'simplified' },
                    { saturation: 30 }
                ]
            },{
                featureType: 'road.local',
                elementType: 'all',
                stylers: [
                    { hue: colourLocal },
                    { saturation: 10 },
                    { gamma: 0.7 },
                    { visibility: 'simplified' }
                ]
            },{
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                    { saturation: 5 },
                    { lightness: 10 }
                ]
            },{
                featureType: 'road.highway',
                elementType: 'labels',
                stylers: [
                    { visibility: 'on' },
                    { saturation: 98 }
                ]
            },{
                featureType: 'administrative.locality',
                elementType: 'labels',
                stylers: [
                    { hue: colourAdmin },
                    { saturation: 50 },
                    { lightness: -10 },
                    { gamma: 0.90 }
                ]
            },{
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [
                    { hue: colourTransit },
                    { visibility: 'on' },
                    { lightness: -70 }
                ]
            }
        ];

        var mapOptions = {
            center: { lat: 13.840658, lng: 104.741345 },
            zoom: 6,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, SEA_MAP_ID],
            },
            mapTypeId: SEA_MAP_ID
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var styledMapOptions = {
            name: 'Custom Style'
        };

        var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

        map.mapTypes.set(SEA_MAP_ID, customMapType);

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
            goldStar;

        goldStar = {
            //path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
            path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
            fillColor: colourStarFill,
            fillOpacity: 1,
            scale: 0.2,
            strokeColor: colourStarOutline,
            strokeWeight: 2,
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
                    scale: 6,
                    strokeColor:  colourMarkerOutline,
                    fillColor: colourMarkerFill,
                    fillOpacity: 1,
                    strokeWeight: 2
                }
            });
        }

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' + obj.title + '</h1>'+
            '<div id="bodyContent" class="imageContainer">'+
            //'<p>' + obj.description + '</p>'+
            '<img class="thumbnail" src=\"' + obj.url + '\" alt=\"' + obj.title + '\"/>' +
//            '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
//            'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
//            '(last visited June 22, 2009).</p>'+
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
            map.setZoom(8);//10
            map.panTo(latLng);
        }
    }

    function createPath(arr){
        var lineSymbol = {
            path: 'M 0,-1 0,1',
            strokeOpacity: 0.5,
            scale: 4,
            strokeColor: colourPath
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