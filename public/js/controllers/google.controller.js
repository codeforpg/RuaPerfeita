(function(){
    'use strict'

    angular
        .module('app')
        .config(GoogleConfig)
        .controller('GoogleController',GoogleController)


    GoogleConfig.$inject = ['$routeProvider','uiGmapGoogleMapApiProvider']
    function GoogleConfig(route,GoogleMapsConfig) {
        route
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'GoogleController',
                controllerAs: 'gc'
            });

        GoogleMapsConfig.configure({
            key: 'AIzaSyCsIhWQ9rLxC8UCpiKt5gies1N80io_gTs',
            v: '3.20',
            libraries: 'weather,geometry,visualization'

        })
    }


    GoogleController.$inject = ['uiGmapGoogleMapApi','PinService']
    function GoogleController(GoogleMap,PinService){
        var gc = this
        
        init()
        
        //////////
        
        
        function init(){

            gc.map = {
                dragZoom: {options: {}},
                center: {
                    latitude: -25.0994250,
                    longitude: -50.1583220
                },
                pan: true,
                zoom: 14,
                refresh: false,
                events: {
                    'click':function(mapModel, eventName, originalEventArgs){
                        var pin = {};
                        pin.lat = originalEventArgs[0].latLng.lat()
                        pin.lng = originalEventArgs[0].latLng.lng()
                        // if(gc.map.zoom < 15)
                        //     gc.map.setZoomOnClick(18)
                        // else
                        console.log(gc.map.zoom)
                        // PinService.add(pin)
                    }
                },
                bounds: {}
            };
            
            GoogleMap.then(function(){
                gc.map.dragZoom = {
                    options: {
                        visualEnabled: true,
                        visualPosition: google.maps.ControlPosition.LEFT,
                        visualPositionOffset: new google.maps.Size(35, 0),
                        visualPositionIndex: null,
                        visualSprite: "http://maps.gstatic.com/mapfiles/ftr/controls/dragzoom_btn.png",
                        visualSize: new google.maps.Size(20, 20),
                        visualTips: {
                            off: "Turn on",
                            on: "Turn off"
                        }
                    }
                }
            })
        }
    }

})()