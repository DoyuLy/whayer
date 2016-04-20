/**
 * Created by duyu on 2016/4/20.
 */
define(['jquery', 'underscore', 'template', 'handlebars'], function($, _ , template){
    var deviceStatus = {
        init: function(){
            var _this = this;
            template.load('xxx.html', function(content){
                if(content != undefined){
                    $('#content').html(Handlebars.compile(content)({}));
                    _this.attachEvent();
                }
            });
        },
        attachEvent: function(){
            require(['domReady!'], function (doc) {

            });
        }
    }
});