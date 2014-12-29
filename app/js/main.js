function init() {

    var albumArr;
    $.ajax({
        type: "GET",
        url: "https://api.imgur.com/3/album/VFmPC.json",
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Client-ID 1b1c5c397f4385e');
        },
        success: function(data) {
            parseJSON(data);
        }
    });

    function parseJSON(obj) {
        albumArr = obj.data.images;
        Map.onReady(passDataToMap);
    };

    function passDataToMap() {
        Map.setData(albumArr);
    }

    console.log('main init');
}
