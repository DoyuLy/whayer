/**
 * Created by duyu on 2016/4/18.
 */

var ws = function (address, clientId) {
    var self = this;
    var socket;
    var server = address;
    //var manualClose = false;
    //var timer;
    this.receivers = [];
    this.clientId = clientId;


    this.stateChanged = function(e) {};

    function addReceiver(key, fun, e, temp) {
        var o = {};
        o.key = key;
        if (temp == null)
            o.temp = true;
        else
            o.temp = temp;
        o.fun = fun;
        o.e = e;
        self.receivers.push(o);
    }
    function removeReceiver(key) {
        for (var i = 0; i < self.receivers.length; i++) {
            if (self.receivers[i].key === key) {
                self.receivers.splice(i, 1);
                return;
            }
        }
    }
    function getReceiver(key) {
        for (var i = 0; i < self.receivers.length; i++) {
            if (self.receivers[i].key === key)
                return self.receivers[i];
        }
        return null;
    }
    function messageDebug(s) {
        console.info(s);
    }
    function messageProcess(e) {
        try {
            var msg = $.parseJSON(e.data);
            messageDebug(msg);
            var receiver = getReceiver(msg.ID);
            if (receiver != null) {
                if (receiver.temp)
                    removeReceiver(msg.ID);
                if (receiver.fun != null)
                    receiver.fun(msg.Data, receiver.e);
            }
        } catch (err) {
            console.info(err);
        }
    }


    this.connected = function () {
        return socket != null && socket.readyState === 1;
    }
    this.open = function () {
        if (!self.connected()) {
            socket = new WebSocket(server);
            socket.onopen = function (e) {
                self.onopen(e);
            };
            socket.onmessage = function (e) {
                if (self.onmessage(e) !== false)
                    messageProcess(e);
            };
            socket.onerror = function (e) {
                self.onerror(e);
            }
            socket.onclose = function (e) {
                //if (manualClose) {
                //    manualClose = false;
                //} else {

                //}
                self.onclose(e);
            }
        }
    };
    this.close = function () {
        if (self.connected()) {
            //manualClose = true;
            socket.close();
        }
    };
    this.send = function (cmd, data, fun, e, temp) {
        if (self.connected()) {
            var msg = {};
            msg.ID = guid.newGuid();
            msg.Cmd = cmd;
            msg.clientId = self.clientId;
            msg.Data = JSON.stringify(data);
            if (fun != null)
                addReceiver(msg.ID, fun, e, temp);
            socket.send(cmd + " " + JSON.stringify(msg));
        }
    };

    this.onopen = function () { };
    this.onmessage = function () { };
    this.onerror = function () { };
    this.onclose = function () { };

    this.registerReceiver = function (cmd, receiver) {
        addReceiver(cmd, receiver, null, false);
    };
    this.removeReceiver = function (cmd) {
        removeReceiver(cmd);
    }

};