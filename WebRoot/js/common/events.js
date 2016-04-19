/**
 * Created by czl on 2015/11/6.
 */
//; (function (factory) {
//    if (typeof exports === 'object')  module.exports = factory();
//    else if (typeof define === 'function' && define.amd) define([], factory);
//    else factory();
//}(function () {
//    var root = this;
//    var Listener = root.Listener = function () {
//        return new Listener.fn.init();
//    };
//
//    Listener.Version = '0.1.0';
//
//    var jQuery = root.jQuery;
//    var $ = root.$;
//
//    Listener.fn = Listener.prototype = {
//        constructor: Listener,
//        init: function () {
//            return this;
//        }
//    };
//
//    Listener.fn.init.prototype = Listener.fn;
//
//}));

var events = function () {
    this.events = {};//common events
    this.mandatoryEvents = {};//force events
    this.listenAlls = [];
};
events.prototype = {
    //constructor: this,//do not work
    myAddEvent: function (el, name, fn) {

        if (el.addEventListener) return el.addEventListener(name, fn, false); //firefox
        return el.attachEvent('on' + name, fn); //ie
    },
    //for dom
    addEventListener: function (type, func) {
        this.addEvent(type, func);
    },
    //for custom
    addEvent: function (type, func) {
        if (!(type in this.events)) {
            this.events[type] = [];
        };
        this.events[type].push(func);

        if (type in this.mandatoryEvents) {
            for (var i = 0; i < this.mandatoryEvents[type].length; i++) {
                var args = this.mandatoryEvents[type][i];
                func(args);
            };
        };
    },
    fireEvent: function (type, args) {
        if (type in this.events) {
            for (var i = 0; i < this.events[type].length; i++) {
                var func = this.events[type][i];
                func(args);
            };
        };
        for (var i = 0, listener; listener = this.listenAlls[i]; i++) {
            listener(type, args);
        };
    },
    fireMandatoryEvent: function (type, args) {
        this.fireEvent(type, args);
        if (!(type in this.mandatoryEvents)) {
            this.mandatoryEvents[type] = [];
        };
        this.mandatoryEvents[type].push(args);
    },
    removeEvent: function (type, func) {
        if (type in this.events) {
            for (var i = 0; i < this.events[type].length; i++) {
                if (func === this.events[type][i]) {
                    this.events[type].splice(i, 1);
                    this.removeEvent(type, func);
                    return;
                };
            };
        };
    },
    removeEvents: function (type) {
        if (type in this.events) {
            this.events[type] = [];
        };
    },
    listenAll: function (func) {
        this.listenAlls.push(func);
    }
}
events.prototype.constructor = events;