/**
 * Created by duyu on 2016/4/19.
 */

var _PLUGIN_PATH = '../resource/plugins/';
var _COMMON_PATH = './common/';
require.config({
    enforceDefine: false,
   /* baseUrl: '',*/
    paths: {
        //libs
        jquery: _PLUGIN_PATH + 'jquery-1.12.2',
        bootstrap: _PLUGIN_PATH + 'bootstrap/js/bootstrap.min',
        layer: _PLUGIN_PATH + "layer/layer",
        handlebars: _PLUGIN_PATH + 'handlebars/handlebars',
        underscore: _PLUGIN_PATH + 'underscore/underscore-min',
        highcharts:_PLUGIN_PATH+"Highcharts/highcharts",
        highchartsTheme:_PLUGIN_PATH+"Highcharts/themes/dark-unica",
        domReady: _PLUGIN_PATH + 'domReady',

        NProgress:_PLUGIN_PATH+"nprogress/nprogress",
        director: _PLUGIN_PATH + 'director.min',
        text: _PLUGIN_PATH + 'text',
        css: _PLUGIN_PATH + 'css',

        //whayer common
        app: 'app',                              //入口函数
        template: _COMMON_PATH + 'template',     //模板加载器
        util: _COMMON_PATH + 'util',             //通用工具类
        events: _COMMON_PATH + 'events',         //自定义注册事件(observer pattern )
        wsclient: _COMMON_PATH + 'wsclient',      //web socket client
        cookie:_COMMON_PATH+"cookie"
    },
    shim: {
        "bootstrap": {deps:["jquery"]},
        "layer":["jquery"],
        "ztree": ["jquery"],
        "handlebars": {
            deps: ["jquery"],
            exports: "handlebars"
        },
        "underscore": {exports: "_" },
        "director": { exports: "Router" },
        "util": ["jquery", "layer", "text"],
        "wsclient": ["util"],
        highcharts: {
            deps: ["jquery"],
            exports: "Highcharts"
        },
        highchartsTheme:{
            deps:["jquery","highcharts"],
            exports:"highchartsTheme"
        }
    },
    waitSeconds:0
    ,urlArgs: "v=2.0"
    /*,urlArgs: "v=" + (new Date()).getTime()*/
});
requirejs.onError = function (error) {
    //console.log(error.message);
    layer.msg(error.message);
};
require(["domReady!","app"], function (doc,app) { 
        app.init();
    }
);