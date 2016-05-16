/**
 * Created by duyu on 2016/4/19.
 */
define(['text'], function(){
    var template = {
        baseUrl: '../view/',
        suffix: '.html',
        templates: { },
        load: function(name, callback){
            var _this = this;
            /*
            if(this.templates[name] != undefined){
                //debugger;
                callback(this.templates[name]);
                return;
            }
            require(['text!' + this.baseUrl + name + _this.suffix], function (content) {
                //debugger;
                _this.templates[name] = content;
                callback(_this.templates[name]);
            });*/

            //single template
            if(typeof name=="string"){
                if(!_this.templates[name]){
                    callback(_this.templates[name]);return;
                }else{                    
                    var _module = 'text!' + this.baseUrl + name + _this.suffix;
                    require([_module],function(content){
                        //_this.templates[name] = content;
                        _this.updateTemplates([{name:name,content:value}]);
                        callback(content);
                    });
                }
            }else{
                var is_array = _this.isArray(name);
                if(is_array){//template Array
                    var _moduleArray = [];
                    for (var i = 0; i < name.length; i++) {
                        var template_name = name[i];
                        if(!_this.templates[template_name]){//template did not load yet
                            var _module = 'text!' + _this.baseUrl + template_name + _this.suffix;
                            _moduleArray.push(_module);
                        }
                    }
                    require(_moduleArray,function(){
                        var args = arguments;
                        callback(args);
                        var objarr = [];
                        for (var i = 0; i < name.length; i++) {
                            var _tmpName = name[i];
                            objarr.push({name:_tmpName,content:arguments[i]});
                        }
                        _this.updateTemplates(objarr);
                    });
                }
            }
        },
        isArray:function(obj){
            return Object.prototype.toString.call(obj)==='[object Array]';
        },
        updateTemplates:function(objarr){
            for (var i = 0; i < objarr.length; i++) {
                var _obj = objarr[i];
                _this.templates[_obj["name"]] = _obj["content"];
            }            
        }
    };

    return template;
});