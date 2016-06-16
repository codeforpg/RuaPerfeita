(function(){
    'use strict'

    angular
        .module('app')
        .config(MainConfig)
        .controller('MainController',MainController)

    MainConfig.$inject = ['$locationProvider']
    function MainConfig(location){
        location.html5Mode(true);
    }

    MainController.$inject = ['SocketService']
    function MainController(Socket) {
        var mc = this;
        mc.map;
        Socket.onMessage(function(message){
            console.log(message);
        })
    }
})()