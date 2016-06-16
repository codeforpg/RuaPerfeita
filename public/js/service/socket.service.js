(function(){
    'use strict'

    angular
        .module('app')
        .service('SocketService',SocketService)

    SocketService.$inject = ['ngSocket']
    function SocketService(ngSocket){
        var ws = ngSocket('ws://192.168.1.48:3000')
        return ws;
    }

})()