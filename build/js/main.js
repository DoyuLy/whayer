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
        bootstrap_table: _PLUGIN_PATH + 'bootstrap-table/bootstrap-table.min',
        bootstrap_table_zh: _PLUGIN_PATH + 'bootstrap-table/locale/bootstrap-table-zh-CN.min',
        /*bootstrap_editable: _PLUGIN_PATH + 'bootstrap-table/extensions/editable/bootstrap-editable.min',*/
        //bootstrap_combobox: _PLUGIN_PATH + 'bootstrap/bootstrap-combobox/bootstrap-combobox',
        bootstrap_slider:_PLUGIN_PATH+"bootstrap-slider/bootstrap-slider.min",
        layer: _PLUGIN_PATH + "layer/layer",
        ztree: _PLUGIN_PATH + 'ztree/js/jquery.ztree.all.min',
        handlebars: _PLUGIN_PATH + 'handlebars/handlebars',
        underscore: _PLUGIN_PATH + 'underscore/underscore-min',
        highcharts: _PLUGIN_PATH + "Highcharts/highcharts",
        highcharts_3d: _PLUGIN_PATH + "Highcharts/highcharts-3d",
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
        cookie: _COMMON_PATH + "cookie",
        model: _COMMON_PATH + "model",
        highcharts_extend: _COMMON_PATH + "highcharts-extend"
    },
    shim: {
        "login": {deps: ["css!../resource/style/login.css"]},
        "layout": {deps: ["css!../resource/style/main.css"]},
        "highcharts": {deps: ["jquery"]},
        "highcharts_3d": {deps: ["jquery", "highcharts"]},
        "bootstrap_table":{
            deps:["bootstrap","css!../resource/plugins/bootstrap-table/bootstrap-table.min.css"]
        },
        "bootstrap": {
            deps: ["jquery", "css!../resource/plugins/bootstrap/css/bootstrap.min.css"],
            exports:"bootstrap"
        },
        "bootstrap_table_zh":{exports:"bootstrap_table_zh"},
        bootstrap_slider:{
            deps:["css!../resource/plugins/bootstrap-slider/css/bootstrap-slider.min.css"]
        },
        "layer": ["jquery"],
        "ztree": ["jquery","css!../resource/plugins/ztree/css/metroStyle/metroStyle.css"],
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
   /* urlArgs: "v=0.1.0"*/
    /*,urlArgs: "v=" + (new Date()).getTime()*/
});
requirejs.onError = function (error) {
    layer.msg(error.message);
};
/*require(["domReady!", "app", "text", "template", "bootstrap", "util", "handlebars"], function (doc, app) {
        app.init();
    }
);*/
require(["domReady!", "layer"], function (doc, layer) {
        //layer.load(0,{shade: [0.8, '#34495E']});
        require(["app","text", "template", "bootstrap", "util", "handlebars"], function (app) {
                app.init();
            }
        )
    }
);