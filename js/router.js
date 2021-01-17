'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);   
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('container');
    },
    init: function () {
        var r = this.routes;
        (function(scope, r) { 
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    // hasChanged: function(scope, r){
    //     if (window.location.hash.length > 0) {
    //         for (var i = 0, length = r.length; i < length; i++) {
    //             var route = r[i];
    //             if(route.isActiveRoute(window.location.hash.substr(1))) {
    //                 scope.goToRoute(route.htmlName);
    //             }
    //         }
    //     } else {
    //         for (var i = 0, length = r.length; i < length; i++) {
    //             var route = r[i];
    //             if(route.default) {
    //                 scope.goToRoute(route.htmlName);
    //             }
    //         }
    //     }
    // },
    hasChanged: function(scope, r){
        // 상단 - BACK, NEW 버튼 
        const backElement = document.getElementById('back');
        const newElement  = document.getElementById('new');

        

        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    if(route.name === 'alarm'){
                        backElement.style.display = 'block';
                        newElement.style.display = 'block';

                        const s = document.createElement("script");
                        s.src = "js/alarm.js";
                        document.querySelector('.body__container').after(s);

                    } else if(route.name === 'memo'){
                        backElement.style.display = 'block';
                        newElement.style.display = 'block';

                        const s = document.createElement("script");
                        s.src = "js/memo.js";
                        document.querySelector('.body__container').after(s);

                    }else if(route.name === 'photo'){
                        backElement.style.display = 'block';
                        newElement.style.display = 'none';

                        const s = document.createElement("script");
                        s.src = "js/photo.js";
                        document.querySelector('.body__container').after(s);
                    }else{
                        backElement.style.display = 'none';
                        newElement.style.display = 'none';
                    }
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        (function(scope) { 
            var url = 'views/' + htmlName,
                xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};