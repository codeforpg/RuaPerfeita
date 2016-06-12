(function () {
    'use strict'

    angular
        .module("app")
        .service("homeService", homeService);

    homeService.$inject = ['$http'];

    function homeService($http) {
        var service = {
            getPin: getPin,
            savePin: savePin,
            votar: votar
        }

        var _url = 'http://localhost:8000/'

        return service;

        function getPin() {
            return $http.get(_url + 'pin')
                .then(function(response){
                    console.log(response)
                    return response
                })
        }

        function savePin(data) {
            return $http.post(_url + 'pin', data)
                .then(function(response){
                    console.log(response);
                    return response
                })
        }

        function votar(pin, voto) {
            return $http.patch('pin/' + pin.id_pin)
                .then(function(response) {
                    console.log(response)
                    return response;
                })
        }
    }
})()