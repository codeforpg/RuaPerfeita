(function(){
    'use strict'

    angular
        .module('app')
        .config(GoogleConfig)
        .controller('GoogleController',GoogleController)


    GoogleConfig.$inject = ['uiGmapGoogleMapApiProvider']
    function GoogleConfig(GoogleMapsConfig) {
        GoogleMapsConfig.configure({
            key: 'AIzaSyCsIhWQ9rLxC8UCpiKt5gies1N80io_gTs',
            v: '3.20',
            libraries: 'weather,geometry,visualization'

        })
    }


    GoogleController.$inject = ['uiGmapGoogleMapApi','PinService','$rootScope']
    function GoogleController(GoogleMap,PinService,rootScope){
        var gc = this;
        gc.pins = [];
        gc.select = select;
        gc.addPin = addPin;
        gc.showComentarios = showComentarios;

        gc.plates = [
          {
            'name': 'Bicicletário'
            , 'img_path': 'bicicletario.png'
          }

          , {
            'name': 'Bicicletário coberto'
            , 'img_path': 'bicicletario_coberto.png'
          }

          , {
            'name': 'Estacionamento'
            , 'img_path': 'estacionamento.png'
          }

          , {
            'name': 'Faixa de pedestres'
            , 'img_path': 'faixa_pedestre.png'
          }

          , {
            'name': 'Lombada'
            , 'img_path': 'lombada.png'
          }

          , {
            'name': 'Lombada retirada'
            , 'img_path': 'lombada_retirada.png'
          }

          , {
            'name': 'Não estacionamento'
            , 'img_path': 'nao_estacionamento.png'
          }

          , {
            'name': 'Não lombada'
            , 'img_path': 'nao_lombada.png'
          }

          , {
            'name': 'Não semaforo'
            , 'img_path': 'nao_semaforo.png'
          }

          , {
            'name': 'Ponto de ônibus'
            , 'img_path': 'ponto_onibus.png'
          }

          , {
            'name': 'Proibido conversão à direita'
            , 'img_path': 'proibido_conversao_direita.png'
          }

          , {
            'name': 'Proibido conversão à esquerda'
            , 'img_path': 'proibido_conversao_esquerda.png'
          }

          , {
            'name': 'Proibido estacionar'
            , 'img_path': 'proibido_estacionar.png'
          }

          , {
            'name': 'Proibido estacionar e para'
            , 'img_path': 'proibido_estacionar_parar.png'
          }
        ];

        init()

        //////////


        function init(){
            PinService.get()
                .then(function(response){
                    for(var i in response)
                        gc.addPin(response[i])
                })
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
                        pin.long = originalEventArgs[0].latLng.lng()
                        if(gc.pin) {
                            pin.tipo = gc.pin
                            if (gc.map.zoom < 15)
                                console.log(gc.map)
                            else
                                gc.addPin(pin)
                                PinService.add(pin)
                        }else{
                            console.log('Voce nao selecionou um pin')
                        }
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
        function setIcon(tipo){
            switch (tipo){
                case 1:
                    return 'icon/lombada.png'
                    break;
                case 2:
                    return 'icon/nao_estacionamento.png'
                    break;
                case 3:
                    return 'icon/nao_lombada.png'
                    break;
                case 4:
                    return 'icon/nao_semaforo.png'
                    break;
                case 5:
                    return 'icon/semaforo.png'
                    break;
            }
        }

        function addPin(pin){
            var pin = {
                lat:pin.lat,
                lng:(pin.lng)?pin.lng:pin.long,
                icon:setIcon(pin.tipo)
            }
            gc.pins.push(pin)
        }

        function select(id) {
          if(gc.pin == id) {
            gc.pin = null;
          } else {
            gc.pin = id;
          }
        }

        function showComentarios(pin){
            gc.comentarios = 'http://localhost:8000/comentarios/'+pin.lat;
            console.log(gc.comentarios);
        }
    }
})();
