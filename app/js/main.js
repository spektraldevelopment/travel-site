function init() {
//    Spektral.loadFile('https://api.imgur.com/3/album/VFmPC', function(){
//       console.log('Success')
//    });

//    makeRequest(
//        'https://api.imgur.com/oauth2/authorize?response_type=token&client_id=1b1c5c397f4385e', onAuthorization,
//        {
//            type: 'POST',
//            onerror: function(err){
//                console.log('Authorization error.');
//            }
//        }
//    );
//
//    function onAuthorization(evt){
//        console.log('Success');
//       makeRequest('https://api.imgur.com/3/album/VFmPC', function(evt){
//          console.log('Response: ' + evt.responseText);
//       });
//    };
//
//
//    function makeRequest (file, callback, options) {
//        var
//            async = Spektral.getParameter(options, 'async', true),
//            onerror = Spektral.getParameter(options, 'onerror', null),
//            requestType = Spektral.getParameter(options, 'type', 'GET'),
//            ext = Spektral.getExtension(file), xhr = Spektral.getXHR();
//
//        if (ext === "json") {
//            xhr.overrideMimeType("application/json");
//        }
//        function checkIfReady() {
//            if (xhr.status === 404) {
//                onerror(xhr.status);
//                xhr.abort();
//            }
//            if (xhr.readyState < 4) {
//                return;
//            }
//            if (xhr.status !== 200) {
//                return;
//            }
//            if (xhr.readyState === 4 && xhr.status === 200) {
//                var response;
//                if (ext === "json") {
//                    response = JSON.parse(xhr.responseText);
//                } else if (ext === "xml") {
//                    response = xhr.responseXML;
//                } else {
//                    response = xhr.responseText;
//                }
//                callback(response);
//            }
//        }
//        function onLoadError(e) {
//            if ( onerror !== null ) {
//                onerror(e);
//            }
//            Spektral.log("loadFile: loadError: There was a load error: " + e, "warn");
//            xhr.abort();
//        }
//        Spektral.attachEventListener(xhr, 'readystatechange', checkIfReady);
//        Spektral.attachEventListener(xhr, 'error', onLoadError);
//
//        xhr.open(requestType, file, async);
//        xhr.send();
//    };

    $.ajax({
        type: "GET",
        url: "https://api.imgur.com/3/album/VFmPC.json",
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Client-ID 1b1c5c397f4385e');
        },
        success: function(data) {
            console.log("Fuck yeah: " + JSON.stringify(data));
        }
    });

    console.log('main init');
}
