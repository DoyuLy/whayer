/**
 * Created by duyu on 2016/4/19.
 */
define(['text'], function () {
    var template = {
        baseUrl: '../view',
        suffix: '.html',
        templates: {},
        load: function (name, callback) {
            var _this = this;
            if (typeof name == "string") {
                if (_this.templates[name]) {
                    callback(_this.templates[name]);
                    return;
                } else {
                    //_this.templates[name] = name;/*initial template content as name*/                
                    var _module = 'text!' + this.baseUrl + name + _this.suffix;
                    require([_module], function (content) {
                        _this.updateTemplates([name], [{name: name, content: content}], [_module]);
                        callback(content);
                    });
                }
            } else {
                var is_array = _this.isArray(name);
                if (is_array) {//template Array
                    var _moduleArray = [];
                    for (var i = 0; i < name.length; i++) {
                        var template_name = name[i];
                        if (!_this.templates[template_name]) {//template did not load yet
                            _this.templates[template_name] = "";
                            var _module = 'text!' + _this.baseUrl + template_name + _this.suffix;
                            _moduleArray.push(_module);
                        }
                    }
                    require(_moduleArray, function () {
                        var args = Array.prototype.slice.call(arguments);
                        var arr = _this.updateTemplates(name, args, _moduleArray);
                        /*excude callback*/
                        callback(arr);
                    });
                }
            }
        },
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        },
        updateTemplates: function (name, args, _moduleArray) {
            var _this = this;
            var objarr = [], content;
            for (var i = 0; i < name.length; i++) {
                var _tmpName = name[i];
                content = _this.templates[_tmpName];
                if (content) {//已加载
                    objarr.push(content);
                } else {
                    for (var j = 0; j < _moduleArray.length; j++) {
                        var _mName = _moduleArray[j];
                        if (_mName.indexOf(_tmpName) != -1) {
                            content = args[j];
                            /*更新template值*/
                            _this.templates[_tmpName] = content;
                            objarr.push(content);
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