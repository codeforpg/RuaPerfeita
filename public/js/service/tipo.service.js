(function(){
    'use strict'

    angular
        .module('app')
        .service('TipoService',TipoService)

    TipoService.$inject = ['$http']
    function TipoService(http){
        var _url = base_url + '/tipo/'
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