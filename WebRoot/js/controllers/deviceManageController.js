/**
 * Created by duyu on 2016/4/20.
 */
define(['jquery', 'underscore', 'template', 'handlebars', 'bootstrap', 'bootstrap_table'], function ($, _ , template, handlebars) {
    var deviceManage = {
        init: function(){
            var _this = this;
            template.load('/status/status.html', function(content){
                if(content != undefined){
                    debugger;
                    $('#content').html(handlebars.compile(content)({}));
                    _this.attachEvent();
                }
            });
        },
        attachEvent: function(){
            require(['domReady!'], function (doc) {

            })
        }
    };

    return deviceManage;
});