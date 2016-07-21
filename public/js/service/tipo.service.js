(function(){
    'use strict'

    angular
        .module('app')
        .service('TipoService',TipoService)

    TipoService.$inject = ['$http']
    function TipoService(http){
        var _url = 'http://localhost:8000/tipo/'
        this.all = all;
        
        
        ////////
        
        function all(){
            return http.get(_url + 'all')
                .then(function(response){
                    return response.data
                })
        }
    }

})()