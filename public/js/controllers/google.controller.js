(function () {
    'use strict'

    angular
        .module('app')
        .config(GoogleConfig)
        .controller('GoogleController', GoogleController)


    GoogleConfig.$inject = ['uiGmapGoogleMapApiProvider', 'ngToastProvider', '$cookiesProvider']
    function GoogleConfig(GoogleMapsConfig, ngToastProvider, $cookiesProvider) {
        GoogleMapsConfig.configure({
            key: 'AIzaSyCsIhWQ9rLxC8UCpiKt5gies1N80io_gTs',
            v: '3.20',
            libraries: 'weather,geometry,visualization'

        })

        ngToastProvider.configure({
            animate: 'fade',
            horizontalPosition: 'center',
            verticalPosition: 'top'
        })

        $cookiesProvider.expires = new Date().setMinutes(new Date().getMinutes() + 10);
    }


    GoogleController.$inject = ['uiGmapGoogleMapApi', 'TipoService', 'PinService', '$rootScope', 'ngToast', 'ngDialog', '$cookies','$window']
    function GoogleController(GoogleMap, TipoService, PinService, rootScope, toast, Modal, $cookie,$window) {
        var gc = this;
        gc.pins = [];
        gc.select = select;
        gc.pin_select = null;
        gc.addPin = addPin;
        gc.downVote = downVote;
        gc.upVote = upVote;
        gc.showComentarios = showComentarios;

        init()

        //////////


        function init() {
            var c = 0 // contador quantas vezes clicou sem selecionar um pin
            PinService.get()
                .then(function (response) {
                    for (var i in response)
                        gc.addPin(response[i])
                })
            TipoService.all()
                .then(function (response) {
                    gc.types = response;
                })
            gc.template = 'templates/search.html'
            gc.map = {
                dragZoom: {options: {}},
                center: {
                    latitude: -25.0994250,
                    longitude: -50.1583220
                },
                pan: true,
                zoom: 16,
                refresh: false,
                events: {
                    'click': function (mapModel, eventName, originalEventArgs) {
                        var pin = {};
                        pin.lat = originalEventArgs[0].latLng.lat()
                        pin.long = originalEventArgs[0].latLng.lng()
                        $window.display_msg = false;
                        if($window.sends){
                            return false;
                        }
                        if (gc.pin ) {
                            pin.tipo = gc.pin;
                            gc.select(gc.pin.id);
                            if (gc.map.zoom < 15)
                                alert('Voce precisa dar mais zoom para adicionar uma melhoria');
                                // toast.create({
                                //     className: 'info',
                                //     content: 'Voce precisa dar mais zoom para adicionar uma melhoria'
                                // });
                            else {
                                if (typeof $cookie.get('pin') == 'string' && new Date($cookie.get('pin') * 1000) > new Date()) {
                                    var diff = new Date($cookie.get('pin') * 1000).getTime() - new Date().getTime();

                                    alert('Alguarde um tempo para adicionar outra melhoria');
                                    // toast.create({
                                    //     className: 'info',
                                    //     content: 'Alguarde um tempo para adicionar outra melhoria'
                                    // });

                                } else {
                                    $cookie.put('pin', (new Date().setSeconds(new Date().getSeconds() + 30) / 1000))
                                    $window.sends = true;
                                    PinService.add(pin)
                                        .then(function (response_pin) {
                                            $window.sends = false;
                                            gc.addPin(response_pin);
                                            toast.create({
                                                className: 'success',
                                                content: 'Melhoria Sugerida, Obrigado !'
                                            });
                                        })
                                }


                            }
                        } else {
                            if ((c % 4) == 0 && c != 0) {
                                toast.create({
                                    className: 'info',
                                    content: 'Caso estaja com duvida use o menu \'Como Usar\' aqui em cima'
                                });
                            }
                            c++;
                            console.log('Voce nao selecionou um pin')
                        }
                    }
                },
                bounds: {}
            };

            GoogleMap.then(function () {
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

        function addPin(pin) {
            var temp_pin = {
                lat: pin.lat,
                lng: (pin.lng) ? pin.lng : pin.long,
                icon: pin.imagem_icon,
                status: pin.id_pin_status,
                id_pin: pin.id_pin,
                voto:(pin.voto)?pin.voto:0
            };
            gc.pins.push(temp_pin)
        }

        function select(id) {
            if (gc.pin == id)
                gc.pin = null;
            else
                gc.pin = id;
        }

        function showComentarios(mapModel, eventName, originalEventArgs) {
            gc.pin_select = originalEventArgs.control;
            gc.comentarios = base_url + 'comentarios/' + originalEventArgs.control.id_pin;
        }

        function downVote(pin) {
            var cookie = $cookie.get('voto');
            var todos_votos = [];
            var acao_voto = false;
            if(typeof cookie == 'string'){
                todos_votos = JSON.parse(cookie);
                var search = '';
                for(var i in todos_votos){
                    if(todos_votos[i].id_pin == pin.id_pin && todos_votos[i].type == '-'){
                        acao_voto = true;
                        search = i;
                        toast.create({
                            className: 'info',
                            content: 'Voto desfeito'
                        });
                        var update_pin = {
                            id_pin: todos_votos[i].id_pin,
                            voto: 1
                        }
                        PinService.update(update_pin)
                            .then(function(response){
                                gc.pin_select = response.pin
                            })
                    }else if(todos_votos[i].id_pin == pin.id_pin && todos_votos[i].type != '-'){
                        todos_votos.splice(todos_votos.indexOf(todos_votos[i]),1);
                        acao_voto = true;
                        todos_votos.push({
                            id_pin: pin.id_pin,
                            type: '-'
                        });
                        toast.create({
                            className: 'success',
                            content: 'Obrigado por votar'
                        });
                        var update_pin = {
                            id_pin: todos_votos[i].id_pin,
                            voto: -1
                        }
                        PinService.update(update_pin)
                        PinService.update(update_pin)
                            .then(function(response){
                                gc.pin_select = response.pin
                            })
                    }
                }
                if(search != '')
                    todos_votos.splice(todos_votos.indexOf(todos_votos[search]),1);
            }
            if(acao_voto == false) {
                todos_votos.push({
                    id_pin: pin.id_pin,
                    type: '-'
                });

                toast.create({
                    className: 'success',
                    content: 'Obrigado por votar'
                });
                var update_pin = {
                    id_pin: pin.id_pin,
                    voto: -1
                }
                PinService.update(update_pin)
                    .then(function(response){
                        gc.pin_select = response.pin
                    })
            }
            $cookie.put('voto', JSON.stringify(todos_votos))
        }

        function upVote(pin) {
            var cookie = $cookie.get('voto');
            var todos_votos = []
            var acao_voto = false;
            if(typeof cookie == 'string'){
                todos_votos = JSON.parse(cookie);
                var search = '';
                for(var i in todos_votos){
                    if(todos_votos[i].id_pin == pin.id_pin && todos_votos[i].type == '+'){
                        acao_voto = true;
                        search = i;
                        toast.create({
                            className: 'info',
                            content: 'Voto desfeito'
                        });
                        var update_pin = {
                            id_pin: todos_votos[i].id_pin,
                            voto: -1
                        }
                        PinService.update(update_pin)
                            .then(function(response){
                                gc.pin_select = response.pin
                            })
                    }else if(todos_votos[i].id_pin == pin.id_pin && todos_votos[i].type != '+'){
                        todos_votos.splice(todos_votos.indexOf(todos_votos[i]),1);
                        acao_voto = true;
                        todos_votos.push({
                            id_pin: pin.id_pin,
                            type: '+'
                        });

                        toast.create({
                            className: 'success',
                            content: 'Obrigado por votar'
                        });
                        var update_pin = {
                            id_pin: todos_votos[i].id_pin,
                            voto: 1
                        }
                        PinService.update(update_pin)
                        PinService.update(update_pin)
                            .then(function(response){
                                gc.pin_select = response.pin
                            })
                    }
                }
                if(search != '')
                    todos_votos.splice(todos_votos.indexOf(todos_votos[search]),1);
            }
            if(acao_voto == false) {
                todos_votos.push({
                    id_pin: pin.id_pin,
                    type: '+'
                });

                toast.create({
                    className: 'success',
                    content: 'Obrigado por votar'
                });
                var update_pin = {
                    id_pin: pin.id_pin,
                    voto: 1
                }
                PinService.update(update_pin)
                    .then(function(response){
                        gc.pin_select = response.pin
                    })
            }
            $cookie.put('voto', JSON.stringify(todos_votos))
        }
    }

})()