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
        var time;
        mc.map;
        mc.changeRange = changeRange;
        mc.checkRange = checkRange;

        init()

        /////////

        function checkRange(range){
            console.log(range);
        }

        function changeRange(range){
            if(mc.old_range == 50){
                if(range < 50){
                    mc.range = 0;
                }else if(range > 50){
                    mc.range = 100;
                }
            }else if(mc.old_range == 0){
                if(range > 0 && range <= 50){
                    mc.range = 50;
                }else if(range > 50){
                    mc.range = 100;
                }
            }else if(mc.old_range == 100){
                if(range < 100 && range >= 50){
                    mc.range = 50;
                }else if(range < 50){
                    mc.range = 0;
                }
            }
            console.log(mc.range,mc.old_range)
            mc.old_range = mc.range;
        }

        function init() {
            mc.range = 50;
            mc.old_range = 50;
            // Socket.connect('http://localhost:3000')
            // Socket.addListEvent('PinEvent')
            // Socket.on('PinEvent', function (message) {
            //     console.log(123, message)
            // })
        }
        
    }
})()