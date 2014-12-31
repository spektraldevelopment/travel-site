(function (window){

    var Overlay = {}, entryOverlay = document.querySelector('#entryOverlay');

    Overlay.show = function(){
        console.log('Overlay show');
        //entryOverlay.setAttribute('style', 'display:block');
        TweenLite.to(entryOverlay, 1, { width: '1024px', height: "768px"});
    };

    window.Overlay = Overlay;

}(window));