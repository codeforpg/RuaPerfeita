(function(){
    'use strict'

    angular
        .module('app')
        .config(MainConfig)
        .controller('MainController',MainController)
    
    MainConfig.$inject = ['$locationProvider','RuaPerfeitaProvider']
    function MainConfig(location,RuaPerfeita){
        location.html5Mode(true);
    }

    MainController.$inject = ['SocketService']
    function MainController(Socket) {
        var mc = this;
        mc.map;
        Socket.connect('http://localhost:3000')
        Socket.addListEvent('PinEvent')
        Socket.on('PinEvent',function(message){
            console.log(123,message)
        })
    }
})()