(function(){
    'use strict'

    angular
        .module('app')
        .service('SocketService',SocketService);

    function SocketService(){
        this.connect = connect;
        this.on = on;
        this.addListEvent = addListEvent;
        var socket;
        var _listEvents = []
        var _baseEvent = 'App\\Events\\';

        /////////
        
        function addListEvent(event){
            if(checkList(event))
                return true;
            var _event = {};
            _event[event] = _baseEvent+event;
            _listEvents.push(_event)
        }

        function connect(url){
            socket = io.connect(url)
        }

        function on(event,callback){
            var _event = checkList(event)

            if(!_event)
                throw 'Valid event is require in SocketService'

            
            socket.on('rua-perfeita:'+_event,function(message){
                callback(message.data)
            })
        }

        function checkList(event){
            for(var i in _listEvents){
                if(_listEvents[i][event])
                    return _listEvents[i][event]
            }
            return false
        }
    }

})()