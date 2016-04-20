/**
 * Created by duyu on 2016/4/20.
 */

define(['jquery', 'underscore', 'template', 'handlebars'], function($, _ , template, handlebars){
    var deviceStatus = {
        init: function(){
            var _this = this;
            template.load('/status/status', function(content){
                if(content != undefined){
                    //debugger;
                    $('#content').html(handlebars.compile(content)({}));
                    _this.attachEvent();
                }
            });
        },
        attachEvent: function(){
            var _this = this;
            require(['domReady!'], function (doc) {
                //ToDo 注册DOM事件

               $('#xxx').on('click', function(){

                });

                $('#xx').on('mouseover', function(){

                });

            });
        }
    };

    return deviceStatus;
});