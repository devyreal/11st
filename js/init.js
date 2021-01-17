'use strict';

(function () {
    function init() {
        var router = new Router([
            // new Route('home', 'home.html', true),            
            new Route('alarm', 'alarm.html'),
            new Route('memo', 'memo.html'),
            new Route('photo', 'photo.html')
        ]);
    }
    init();
}());