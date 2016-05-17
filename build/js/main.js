/**
 * Created by duyu on 2016/4/19.
 */

var _PLUGIN_PATH = '../resource/plugins/';
var _COMMON_PATH = './common/';
require.config({
    enforceDefine: false,
    /* baseUrl: '',*/
    paths: {
        //--------------------  libs  --------------------
        jquery: _PLUGIN_PATH + 'jquery-1.12.2',
        bootstrap: _PLUGIN_PATH + 'bootstrap/js/bootstrap.min',
        bootstrap_table: _PLUGIN_PATH + 'bootstrap/bootstrap-table/bootstrap-table.min',
        bootstrap_table_zh: _PLUGIN_PATH + 'bootstrap/bootstrap-table/local/bootstrap-table-zh-CN.min',
        bootstrap_editable: _PLUGIN_PATH + 'bootstrap/bootstrap-editable/js/bootstrap-editable.min',
        //bootstrap_combobox: _PLUGIN_PATH + 'bootstrap/bootstrap-combobox/bootstrap-combobox',
        layer: _PLUGIN_PATH + "layer/layer",
        ztree: _PLUGIN_PATH + 'ztree/jquery.ztree.all.min',
        handlebars: _PLUGIN_PATH + 'handlebars/handlebars',
        underscore: _PLUGIN_PATH + 'underscore/underscore-min',
        highcharts: _PLUGIN_PATH + "Highcharts/highcharts",
        highchartsTheme: _PLUGIN_PATH + "Highcharts/themes/dark-unica",
        NProgress: _PLUGIN_PATH + "nprogress/nprogress",

        //--------------------  router  --------------------
        director: _PLUGIN_PATH + 'director.min',

        //--------------------  require plugin  --------------------
        domReady: _PLUGIN_PATH + 'domReady',
        text: _PLUGIN_PATH + 'text',
        css: _PLUGIN_PATH + 'css',

        //--------------------  controller  ----------------------
        "layout": "./controller/layout",
        "login": "./controller/login/login",
        "usergroup": "./controller/usergroup/usergroup",

        //-------------------- whayer common --------------------
        app: 'app',                              //入口函数
        template: _COMMON_PATH + 'template',     //模板加载器
        util: _COMMON_PATH + 'util',             //通用工具类
        events: _COMMON_PATH + 'events',         //自定义注册事件(observer pattern )
        wsclient: _COMMON_PATH + 'wsclient',      //web socket client
        cookie: _COMMON_PATH + "cookie"
    },
    shim: {
        "login": {deps: ["css!../resource/style/login.css"]},
        "layout": {deps: ["css!../resource/style/main.css"]},

        "bootstrap": {
            deps: ["jquery", "css!../resource/plugins/bootstrap/css/bootstrap.min.css"]
        },
        "layer": ["jquery"],
        "ztree": ["jquery"],
        "handlebars": {
            deps: ["jquery"],
            exports: "handlebars"
        },
        "underscore": {exports: "_"},
        "director": {exports: "Router"},
        "util": ["jquery", "layer", "text"],
        "wsclient": ["util"],
        "NProgress": {
            deps: ["css!../resource/plugins/nprogress/nprogress"]
        },
        highcharts: {
            deps: ["jquery"],
            exports: "Highcharts"
        },
        highchartsTheme: {
            deps: ["jquery", "highcharts"],
            exports: "highchartsTheme"
        }
    },
    waitSeconds: 0
});
requirejs.onError = function (error) {
    layer.msg(error.message);
};
require(["domReady!", "app", "text", "template", "bootstrap", "util", "handlebars"], function (doc, app) {
        app.init();
    }
);