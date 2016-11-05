(function(){
    'use strict'

    angular
        .module('app')
        .service('PinService',PinService)

    PinService.$inject = ['$http','RuaPerfeita']
    function PinService(http,RuaPerfeita){
        this.add = add;
        this.get = get;
        this.last = last;
        this.update = update;
        this.getTypes = getTypes;
        var _error = _error,
            _url = RuaPerfeita.urlBase+'pin/';

        /////////
        
        function add(pin){
            return http.post(_url,pin)
                .then(function(response){
                    return response.data;
                })
        }
        
        function get(){
            return http.get(_url)
                .then(function(response){
                    return response.data;
                });
        }

        function update(pin){
            return http.put(_url+pin.id_pin,pin)
                .then(function(response){
                    return response.data;
                });
        }

        function getTypes() {
            return http.get('tipo/all')
                .then(function(response){
                    return response.data
                })
        }

        function last() {
            return http.get('last')
                .then(function(response){
                    return response.data;
                });
        }
    }
    
})()