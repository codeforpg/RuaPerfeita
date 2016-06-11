(function () {
    'use strict'

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log', 'uiGmapGoogleMapApi', '$http'];

    function HomeController($log, uiGmapGoogleMapApi, $http) {
        var hc = this;
        hc.pins;
        hc.map;
        hc.stick;
        hc.icon;
        hc.userVoto;
        hc.getPins = getPins;
        hc.initMap = initMap;
        hc.uiMapApi = uiMapApi;
        hc.add = add;
        hc.votar = votar;
        hc.select = select;
        /////

        init();

        function init() {
            hc.pins = [];
            hc.stick = {};
            hc.userVoto = false;
            hc.map = initMap();
            uiMapApi();
            getPins()
        }

        function getPins() {
            $http.get('pin').then(function (result) {
                var pins = result.data
                angular.forEach(pins, function (p) {
                    var pin = {};
                    pin.id_pin = p.id_pin;
                    pin.lat = p.lat;
                    pin.lng = p.long;
                    pin.voto = p.voto;
                    switch (p.tipo) {
                        case 1:
                            pin.title = 'Lombada';
                            pin.icon = 'icon/lombada.png';
                            break;
                        case 2:
                            pin.title = 'Remover Lombada';
                            pin.icon = 'icon/nao_lombada.png';
                            break;
                        case 3:
                            pin.title = 'Semaforo';
                            pin.icon = 'icon/semaforo.png';
                            break;
                        case 4:
                            pin.title = 'Remover Semaforo';
                            pin.icon = 'icon/nao_semaforo.png';
                            break;
                        case 6:
                            pin.title = 'Remover Estacionamento';
                            pin.icon = 'icon/nao_estacionamento.png';
                            break;
                    }
                    hc.pins.push(pin);
                })
            })
        }

        function initMap() {
            var map = {
                dragZoom: {options: {}},
                center: {
                    latitude: -25.0994250,
                    longitude: -50.1583220
                },
                pan: true,
                zoom: 14,
                refresh: false,
                events: {
                    'click': function (mapModel, eventName, originalEventArgs) {
                        if (hc.stick.tipo) {
                            var pin = {};
                            pin.lat = originalEventArgs[0].latLng.lat()
                            pin.lng = originalEventArgs[0].latLng.lng()
                            pin.icon = hc.icon;
                            hc.add(pin)
                            hc.$evalAsync();
                            hc.stick = {};
                        }
                    }
                },
                bounds: {}
            };
            ;
            return map;
        }

        function uiMapApi() {
            uiGmapGoogleMapApi.then(function () {
                hc.map.dragZoom = {
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
            });
        }

        function add(pin){
            pin.icon = hc.stick.icon;
            pin.html = hc.stick.html;
            pin.title = hc.stick.title;
            pin.voto = hc.stick.voto;
            pin.remover = true;
            var data = {
                lat: pin.lat,
                long: pin.lng,
                tipo:  hc.stick.tipo
            };
            $http.post('/pin',data).then(function(result){
                hc.getPins();
            })
        }

        function select(icon){
            if(hc.stick.icon != 'public/icon/'+icon+'.png') {
                hc.stick.icon = 'public/icon/' + icon + '.png';
                hc.stick.html = 'public/template/' + icon + '.html';
                switch (icon) {
                    case 'lombada':
                        hc.stick.title = 'Lombada';
                        hc.stick.tipo = 1;
                        hc.stick.voto = 0;
                        break;
                    case 'nao_lombada':
                        hc.stick.title = 'Remover Lombada';
                        hc.stick.tipo = 2;
                        hc.stick.voto = 0;
                        break;
                    case 'semaforo':
                        hc.stick.title = 'Semaforo';
                        hc.stick.tipo = 3;
                        hc.stick.voto = 0;
                        break;
                    case 'nao_semaforo':
                        hc.stick.title = 'Remover Semaforo';
                        hc.stick.tipo = 4;
                        hc.stick.voto = 0;
                        break;
                    case 'nao_estacionamento':
                        hc.stick.title = 'Remover Estacionamento';
                        hc.stick.tipo = 6;
                        hc.stick.voto = 0;
                        break;
                }
            }else{
                hc.stick = {};
            }
        }

        function votar(pin,status){
            if(!pin.hideButton) {
                if (status) {
                    pin.voto = pin.voto + 1;
                    pin.hideButton = true;
                    $http.patch('pin/' + pin.id_pin, {voto: 1}).then(function (result) {
                        hc.getPins();
                    })
                } else {
                    pin.voto = pin.voto - 1;
                    pin.hideButton = true;
                    $http.patch('pin/' + pin.id_pin, {voto: -1}).then(function (result) {
                        hc.getPins();
                    })

                }
                hc.userVoto = false;
            }
        }

    }
})();