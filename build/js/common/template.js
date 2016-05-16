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
                             _this.templates[template_name] = template_name;
                            var _module = 'text!' + _this.baseUrl + template_name + _this.suffix;
                            _moduleArray.push(_module);
                        }
                    }
                    require(_moduleArray,function(){
                        var args = arguments;
                        /*update template content*/
                        var objarr = [];
                        for (var i = 0; i < name.length; i++) {
                            var _tmpName = name[i];
                            objarr.push({name:_tmpName,content:arguments[i]});
                        }
                        _this.updateTemplates(name,objarr);
                        /*excude callback*/
                        callback(args);
                    });
                }
            }
        },
        isArray:function(obj){
            return Object.prototype.toString.call(obj)==="[object Array]";
        },
        updateTemplates:function(loadArr,newArr){
            var arr=[];
            for (var i = 0; i < loadArr.length; i++) {
                var _obj = loadArr[i];
                var _name = _obj["name"];
                var _tmpContent = _this.templates[_name];
                if(_tmpContent){//该模板已加载
                   arr.push({name:_name,content:_tmpContent});
                }else{//模板未加载,从newArr更新模板结果
                    //_this.templates[_name]=
                    for (var j = 0; j< newArr.length; j++) {
                        var _newObj = newArr[j];
                        if(_newObj["name"==_name]){
                            _this.templates[_name]=_newObj["content"];
                             arr.push({name:_name,content:_newObj["content"]});
                        }
                    }
                }                
            } 
            return arr;          
        }
    };

    return template;
});