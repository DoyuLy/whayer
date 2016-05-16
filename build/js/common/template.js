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

            /*load multiple template*/
            if(typeof name=="string"){
                if(!_this.templates[name]){
                    callback(_this.templates[name]);return;
                }else{    
                    //_this.templates[name] = name;/*initial template content as name*/                
                    var _module = 'text!' + this.baseUrl + name + _this.suffix;
                    require([_module],function(content){                        
                        _this.updateTemplates(name,[{name:name,content:content}]);
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
                             _this.templates[template_name] = "";
                            var _module = 'text!' + _this.baseUrl + template_name + _this.suffix;
                            _moduleArray.push(_module);
                        }
                    }
                    require(_moduleArray,function(){ 
                        var args = arguments;
                        var arr = _this.updateTemplates(args,_moduleArray);
                        /*excude callback*/
                        callback(objarr);
                    });
                }
            }
        },
        isArray:function(obj){
            return Object.prototype.toString.call(obj)==="[object Array]";
        },
        updateTemplates:function(args,_moduleArray){
           var _this = this;
           var args = arguments;
            var objarr = [];
            for (var i = 0; i < name.length; i++) {
                var _tmpName = name[i];
                var content = _this.templates[_tmpName];
                if(content){//已加载
                      objarr.push({name:_tmpName,content:content});
                }else{
                    for (var j = 0; j < _moduleArray.length; j++) {
                        var _mName = _moduleArray[j];
                        var index1 = _mName.lastIndexOf('/')+1;
                        var index2 = _mName.lastIndexOf('.');
                        _mName=_mName.substring(index1,index2);
                        if(_tmpName==_mName){
                            content = args[j];
                            /*更新template值*/
                            _this.templates[_tmpName]=content;
                            objarr.push({name:_tmpName,content:content});
                            break;
                        }                               
                    }
                }                       
            }
            return objarr;    
        }
    };

    return template;
});