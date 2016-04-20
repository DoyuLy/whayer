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
        bootstrap_datetimepicker: _PLUGIN_PATH + 'bootstrap/bootstrap-datetimepicker/bootstrap-datetimepicker.min',
        bootstrap_table_zh: _PLUGIN_PATH + 'bootstrap/bootstrap-table/local/bootstrap-table-zh-CN.min',
        bootstrap_datetimepicker_zh: _PLUGIN_PATH + 'bootstrap/bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN',
        layer: _PLUGIN_PATH + "layer2.2/layer",
        ztree: _PLUGIN_PATH + 'ztree/jquery.ztree.all.min',
        handlebars: _PLUGIN_PATH + 'handlebars/handlebars',
        underscore: _PLUGIN_PATH + 'underscore/underscore-min',
        domReady: _PLUGIN_PATH + 'domReady',

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
        "bootstrap_table": ["jquery", "bootstrap_table_zh"],
        "bootstrap_editable": ["jquery"],
        "bootstrap_datetimepicker": ["jquery", "bootstrap_datetimepicker_zh"],
        "layer": ["jquery"],
        "ztree": ["jquery"],
        "handlebars": {
            deps: ['jquery'],
            exports: 'handlebars'
        },
        "underscore": {
            exports: '_'
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
    "jquery", "app", "text", "template", "bootstrap", "util", "handlebars"
], function (jquery, app) {
    jquery(function () {
        //初始化路由
        app.init();
    });
});