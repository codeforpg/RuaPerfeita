(function(){
    'use strict'

    angular
        .module('app')
        .config(MainConfig)
        .controller('MainController',MainController)
    
    MainConfig.$inject = ['$routeProvider','$locationProvider','RuaPerfeitaProvider']
    function MainConfig(route,location,RuaPerfeita){
        route
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'MainController',
                controllerAs: 'mc'
            });


        location.html5Mode(true);
    }

    MainController.$inject = ['SocketService']
    function MainController(Socket) {
        var mc = this;
        mc.map;

        init()

        /////////

        function init() {
            Socket.connect('http://192.168.1.49:3000')
            Socket.addListEvent('PinEvent')
            Socket.on('PinEvent', function (message) {
                console.log(123, message)
            })
        }
        
    }
})()