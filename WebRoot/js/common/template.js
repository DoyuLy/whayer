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
                callback(this.templates[name]);
            }
            require(['text!' + this.baseUrl + name], function (content) {
                _this.templates[name] = content;
                callback(_this.templates[name]);
            });
        }
    };

    return template;
});