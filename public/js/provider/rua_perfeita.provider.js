(function(){
    'use strict'

    angular
        .module('app')
        .provider('RuaPerfeita',RuaPerfeitaProvider)

    function RuaPerfeitaProvider(){
        var _url = 'http://localhost:8000/'

        this.setUrl = function (url){
            if(typeof url == 'string')
                _url = url;
        }

        this.$get = function(){
            return {
                urlBase: _url
            }
        }
    }


})()