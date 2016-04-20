/**
 * Created by duyu on 2016/4/19.
 */

var _PLUGIN_PATH = '../resource/plugin/';
var _COMMON_PATH = './common/';
require.config({
    enforceDefine: false,
    //baseUrl: '',
    paths: {
        //libs
        jquery: _PLUGIN_PATH + 'jquery-1.12.2',
        bootstrap: _PLUGIN_PATH + 'bootstrap/js/bootstrap.min',
        bootstrap_table: _PLUGIN_PATH + 'bootstrap/bootstrap-table/bootstrap-table.min',
        bootstrap_editable: _PLUGIN_PATH + 'bootstrap/bootstrap-editable/js/bootstrap-editable.min',
        "bootstrap_datetimepicker": _PLUGIN_PATH + 'bootstrap/bootstrap_datetimepicker/bootstrap_datetimepicker.min',
        layer: _PLUGIN_PATH + "layer2.2/layer",
        ztree: _PLUGIN_PATH + 'ztree/jquery.ztree.all.min',
        handlebars: _PLUGIN_PATH + 'handlebars/handlebars',

        director: _PLUGIN_PATH + 'director',
        text: _PLUGIN_PATH + 'text',
        css: _PLUGIN_PATH + 'css',

        //whayer common
        app: 'app',                              //入口函数
        template: _COMMON_PATH + 'template',     //模板加载器
        util: _COMMON_PATH + 'util',             //通用工具类
        events: _COMMON_PATH + 'events',         //自定义注册事件(observer pattern )
        wsclient: _COMMON_PATH + 'wsclient'      //web socket client
    },
    shim: {

        "bootstrap": ["jquery"],
        "bootstrap_table": ["jquery"],
        "bootstrap_editable": ["jquery"],
        "bootstrap_datetimepicker": ["jquery"],
        "layer": ["jquery"],
        "ztree": ["jquery"],
        "handlebars": {
            deps: ['jquery']
            //exports: 'handlebars'
        },
        "director":{
            deps: ['jquery'],
            exports: 'director'
        },
        "util": ["jquery", "layer", "text"],
        "wsclient": ["util"]
    },
    priority: [
        "angular", "jquery"
    ],
    urlArgs: "v=" + (new Date()).getTime()
});


require([
    "jquery", "app", "text", "template", "bootstrap", "util"
], function (jquery, app) {
    jquery(function () {
        //初始化路由
        app.init();
    });
});