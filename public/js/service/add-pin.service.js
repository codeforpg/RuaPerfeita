(function(){
    'use strict';

    angular.module('app')
        .service('addPinService',addPinService);

    addPinService.$inject = ['$q','$rootScope'];
    function addPinService($q,$rootScope) {
        var deffer = $q.defer();

        this.appendModal = function() {

            $('#myModal ').modal('show');
            $('#save').click(function(){
                deffer.resolve($rootScope.descricao);
                $('#myModal ').modal('show');
            });

            return deffer.promise
        }

    }

})();