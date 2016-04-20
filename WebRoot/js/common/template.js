/**
 * Created by duyu on 2016/4/19.
 */
define(['text'], function(){
    var template = {
        baseUrl: '../view',
        templates: { },
        load: function(name, callback){
            var _this = this;
            if(this.templates[name] != undefined){
                //debugger;
                callback(this.templates[name]);
                return;
            }
            require(['text!' + this.baseUrl + name], function (content) {
                //debugger;
                _this.templates[name] = content;
                callback(_this.templates[name]);
            });
        }
    };

    return template;
});