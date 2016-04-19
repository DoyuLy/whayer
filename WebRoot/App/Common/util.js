/**
 * Created by czl on 2015/11/6.
 */

; (function (factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    }
    else if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else {
        factory();
    }
}(function () {

    var root = this;

    var Whayer = root.Whayer = function () {
        return new Whayer.fn.init();
    };

    Whayer.Version = '0.1.0';

    var jQuery = root.jQuery;
    var $ = root.$;
    var _ = root._;

    Whayer.fn = Whayer.prototype = {
        constructor: Whayer,
        init: function () {
            return this;
        }
    };

    Whayer.fn.init.prototype = Whayer.fn;

    Whayer.inherit = function(sub, sup){
        var dummy = function () { };
        dummy.prototype = sup.prototype;//不会继承父类私有属性
        dummy.prototype.__super__ = sup.prototype;
        sub.prototype = new dummy();
        sub.prototype.constructor = sub;
        if (sup.prototype.constructor == Object.prototype.constructor) {
            sup.prototype.constructor = sup;
        }
    }

    Whayer.jsonp = function(url, data, successFn, errorFn)
    {
        $.ajax(
            {
                url : url,
                data : data,
                dataType : 'jsonp',
                jsonp : "jsonpcallback",
                success : function(data)
                {
                    successFn&&successFn(data)
                },
                cache: false,
                error : function(response)
                {
                    errorFn&&errorFn(response);
                },
                timeout : 10000
            });
    }

    Whayer.json = function(url, data, successFn, errorFn)
    {
        $.ajax(
            {
                url : url,
                data : data,
                dataType : 'json',
                success : function(data)
                {
                    successFn&&successFn(data)
                },
                error : function(response)
                {
                    errorFn&&errorFn(response);
                },
                timeout : 10000
            });
    }

    Whayer.ajax = function(url, data, type, successFn, errorFn, async)
    {
        if (async == undefined) {
            async = true;
        }
        if (type === '') {
            type = 'GET';
        }
        $.ajax(
            {
                url : url,
                data : data,
                type : type,
                dataType : 'json',
                beforeSend: function () {
                    //请自行添加加载时的动画
                },
                async: async,
                success : function(data)
                {
                    if(data && data.status){
                        //请自行添加加载成功的动画
                        successFn && successFn(data)
                    }else{
                        layer.msg(data.message);
                        return;
                    }
                },
                cache: false,
                error : function(err)
                {
                    if(err){
                        layer.msg(err.httpCode || err.message);
                        errorFn && errorFn(response);
                    }else{
                        layer.msg('服务器出错,请稍后再试。');
                        return;
                    }
                },
                timeout : 10000
            });
    }
    
    Whayer.Cookies =
    {  
    	  /**
		   * 设置cookie 使用方法：Whayer.Cookies.setCookie('username','Darren',30)
		   */
          setCookie : function (sName, sValue, oExpires, sPath, sDomain, bSecure) {  
              var sCookie = sName + '=' + encodeURIComponent(sValue);  
              if (oExpires) {  
                  var date = new Date();  
                  date.setTime(date.getTime() + oExpires * 60 * 60 * 1000);  
                  sCookie += '; expires=' + date.toUTCString();  
              }  
              if (sPath) {  
                  sCookie += '; path=' + sPath;  
              }  
              if (sDomain) {  
                  sCookie += '; domain=' + sDomain;  
              }  
              if (bSecure) {  
                  sCookie += '; secure';  
              }  
              d.cookie = sCookie;  
          },  
          /**
           * 读取cookie
           */
          getCookie : function (sName) {  
              var sRE = '(?:; )?' + sName + '=([^;]*)';  
              var oRE = new RegExp(sRE);  
              if (oRE.test(d.cookie)) {  
                  return decodeURIComponent(RegExp[$1]);  
              } else {  
                  return null;  
              }  
          },  
          
          removeCookie : function (sName, sPath, sDomain) {  
              this.setCookie(sName, '', new Date(0), sPath, sDomain);  
          },  
          
          clearAllCookie : function () {  
              var cookies = d.cookie.split(";");  
              var len = cookies.length;  
              for (var i = 0; i < len; i++) {  
                  var cookie = cookies[i];  
                  var eqPos = cookie.indexOf("=");  
                  var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;  
                  name = name.replace(/^\s*|\s*$/, "");  
                  d.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";  
              }  
          }  
    }
    
    /**
     * 日期格式化函数
     */
    Whayer.formatDate = function(value, format)
    {
      if (value == null)
      {
        return "";
      }
      var date = new Date(value);
      if (arguments.length < 2 && !date.getTime)
      {
        format = date;
        date = new Date();
      }
      typeof format != 'string' && (format = 'YYYY年MM月DD日 hh时mm分ss秒');
      var week =
      [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
          'Saturday', '日', '一', '二', '三', '四', '五', '六' ];
      return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g,
          function(a)
          {
            switch (a)
            {
            case "YYYY":
              return date.getFullYear();
            case "YY":
              return (date.getFullYear() + "").slice(2);
            case "MM":
              return date.getMonth() + 1;
            case "DD":
              return date.getDate();
            case "hh":
              return date.getHours();
            case "mm":
              return date.getMinutes();
            case "ss":
              return date.getSeconds();
            case "星期":
              return "星期" + week[date.getDay() + 7];
            case "周":
              return "周" + week[date.getDay() + 7];
            case "week":
              return week[date.getDay()]; 
            case "www":
              return week[date.getDay()].slice(0, 3);
            }
          });
    }

    /**
	 * 
	 * @param input
	 * @returns
	 */
	Whayer.htmlEncode = function(str) {
		var converter = document.createElement("DIV");
		converter.innerText = str;
		var output = converter.innerHTML;
		converter = null;
		return output;
	}

	/**
	 * 
	 * @param input
	 * @returns
	 */
	Whayer.htmlDecode = function(str) {
		var s = "";
		if (str.length == 0)
			return "";
		s = str.replace(/&gt;/g, "&");
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&nbsp;/g, " ");
		s = s.replace(/&#39;/g, "\'");
		s = s.replace(/&quot;/g, "\"");
		s = s.replace(/<br>/g, "\n");
		return s;
	}
    
    /**
	 * 获取Url请求参数
	 * 
	 * @param name
	 * @returns
	 */
    Whayer.getParameter = function(name)
    {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); // 匹配目标参数
      if (r != null)
        return unescape(r[2]);
      return null; // 返回参数值
    }
    
    Whayer.trim=function (str) {
      var re = /^\s*(.*?)\s*$/;  
      return str.replace(re, '$1');  
    }
    
    Whayer.escape=function (str) {
      var s = "";  
      if (str.length === 0) {  
          return "";  
      }  
      s = str.replace(/&/g, "&amp;");  
      s = s.replace(/</g, "&lt;");  
      s = s.replace(/>/g, "&gt;");  
      s = s.replace(/ /g, "&nbsp;");  
      s = s.replace(/\'/g, "&#39;");  
      s = s.replace(/\"/g, "&quot;");  
      return s;  
    }
    
    /**
     * 是否日期(全格式)
     * @param string
     * @return boolean
     */
    Whayer.isDateTime = function (str) {//形如 (2008-07-22 13:04:06)
        if (!str) return false;
        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        var r = str.match(reg);
        if (r == null) return false;
        var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
    }
    
    /**
     * 判断是否日期格式
     * @param string
     * @return boolean
     */
    Whayer.isDate = function (value) {//形如 2008-07-22
        if (!value) return false;
        var r = value.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); //形如 2008-07-22
        if (r == null) return false;
        var d = new Date(r[1], r[3] - 1, r[4]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    }


	/**
     * 比较日期大小
	 * @param 日期1
	 * @param 日期2
	 * @return boolean
     */
	Whayer.compareDate = function (value1, value2) {
	    if (!value1 || !value2) return false;
	    var r1 = value1.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	    var r2 = value2.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	    if (r1 == null || r2 == null) return false;
	    var d1 = new Date(r1[1], r1[3] - 1, r1[4]);
	    var d2 = new Date(r2[1], r2[3] - 1, r2[4]);
	    return (d1<=d2);
	}
	
	/**
	 * 是否IP地址
	 * @param string
	 * @return boolean
	 */
	Whayer.isIpAddress = function (ip) {
	    if (ip == "")
	        return false;
	   var  ip_ip = '(25[0-5]|2[0-4]\\d|1\\d\\d|\\d\\d|\\d)';
	   var ip_ipdot = ip_ip + '\\.';
	   var isIPaddress = new RegExp('^' + ip_ipdot + ip_ipdot + ip_ipdot + ip_ip + '$');
	    if (ip.match(isIPaddress) == null) {
	        return false;
	    }
	    return true;
	}
	
	/**
	 * 获取HASH值
	 * @param string key
	 * @return string value
	 */
	Whayer.getHashValue = function(name) {
	    var nameRegExp = new RegExp("(?:\#|&|^)" + name + "=([^&]*)");
	    var value = location.hash.match(nameRegExp);
	    return value === null ? '' : decodeURI(value[1]);
	}
    
	/**
	 * 截取指定长度字符串
	 * @param 要截取的字符串
	 * @param 要截取的长度
	 * @return 截取后的字符串
	 */
	Whayer.cutString = function (str, len) { //截取
	    if (typeof (str) != "string") { return null; };
	    if (!(/^[0-9]*[1-9][0-9]*$/).test(len)) { return str; };
	    if (len == 0) { return str; };
	    var sum = 0, newStr = "";
	    for (var i = 0; i < str.length; i++) {
	        if (str.charCodeAt(i) > 255) {
	            sum += 2;
	        } else {
	            sum++;
	        };
	        if (sum <= len - 2) {
	            newStr += str.charAt(i);
	        } else {
	            if (i == str.length - 1) {
	                newStr += str.charAt(i);
	            } else {
	                newStr += "...";
	            };
	            break;
	        };
	    };
	    return newStr;
	}
	
	/**
	 * Byte 单位转换(byte)
	 * @param 数值大小
	 * @return 1GB 2MB 3KB
	 */
	Whayer.TransferSize = function (size) {
	    if (isNaN(size) || size < 0) return "0 bytes";
	    var val = parseFloat(1.0 * size / 1024);
	    if (val > 1024) {
	        val = parseFloat(1.0 * val / 1024);
	        if (val > 1024) {
	            val = parseFloat(1.0 * val / 1024);
	            return Math.round(val * Math.pow(10, 2)) / Math.pow(10, 2) + " GB";
	        }
	        return Math.round(val * Math.pow(10, 2)) / Math.pow(10, 2) + " MB";
	    }
	    return Math.round(val * Math.pow(10, 2)) / Math.pow(10, 2) + " KB";
	}
	
	/**
	 * 检查浏览器是否支持HTML5本地存储
	 * @param null
	 * @return boolean
	 */
	Whayer.checkSupport = function(){
		if(typeof localStorage != "undefined") {
			return true;
		}else if(typeof sessionStorage != "undefined"){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * SessionStorage 更新/保存值
	 * @param key
	 * @param value
	 * @return null
	 */
	Whayer.sessionSaveOrUpdate = function(key,value){
		var hasValue = sessionStorage.getItem(key);
		if(hasValue == null || typeof hasValue == "undefined"){
			sessionStorage.setItem(key,value);
		}else{
			sessionStorage.removeItem(key);
			sessionStorage.setItem(key,value);
		}
	}
	
	/**
	 * SessionStorage 取值
	 * @param key
	 * @return value
	 */
	Whayer.fn.sessionGetValue = function(key){
		var result = sessionStorage.getItem(key);
		if(result == null || typeof result == "undefined"){
			return "";
		}else{
			return result;
		}
	}
	
	/**
	 * SessionStorage 删除 
	 * @param key
	 * @return null
	 */
	Whayer.sessionRemove = function(key){
		var result = sessionStorage.getItem(key);
		if(result == null || typeof result == "undefined"){
			return;
		}else{
			sessionStorage.removeItem(key);
		}
	}
	
	/**
	 * LocalStorage 存值或更新
	 * @param key
	 * @param value
	 * @return null
	 */
	Whayer.localSaveOrUpdate = function(key,value){
		var hasValue = localStorage.getItem(key);
		if(hasValue == null || typeof hasValue == "undefined"){
			localStorage.setItem(key,value);
		}else{
			localStorage.removeItem(key);
			localStorage.setItem(key,value);
		}
	}

	/**
	 * LocalStorage 取值
	 * @param key
	 * @return value
	 */
	Whayer.localGetValue = function(key){
		var result = localStorage.getItem(key);
		if(result == null || typeof result == "undefined"){
			return "";
		}else{
			return result;
		}
	}

	/**
	 * LocalStorage 删除
	 * @param key
	 * @return null
	 */
	Whayer.localRemove = function(key){
		var result = localStorage.getItem(key);
		if(result == null || typeof result == "undefined"){
			return;
		}else{
			localStorage.removeItem(key);
		}
	}

	/**
	 * LocalStorage 清除所有
	 * @param null
	 * @return null
	 */
	Whayer.localClose = function() {
	    localStorage.clear();
	}

	/**
	 * 经度转换
	 * @param 精度数值
	 * @return 格式化值
	 */
	Whayer.TransformLongitude = function (longitude) {
	    var longitudeSuffix = longitude > 0 ? "E" : "W";
	    longitude = Math.abs(longitude);
	    //度
	    var degreex = Math.floor(longitude);
	    //分
	    var pointsx = Math.floor((longitude - degreex) * 60);
	    //秒
	    var secondsx = Math.round(((longitude - degreex) * 60 - pointsx) * 60, 2);
	    return degreex + '°' + pointsx + "'" + secondsx + '\"' + longitudeSuffix;
	}

	/**
	 * 纬度换算
	 * @param 精度数值
	 * @return 格式化值
	 */
	Whayer.TransformLatitude = function (latitude) {
	    var latitudeSuffix = latitude > 0 ? "N" : "S";
	    latitude = Math.abs(latitude);
	    //度
	    var degreey = Math.floor(latitude);
	    //分
	    var pointsy = Math.floor((latitude - degreey) * 60);
	    //秒
	    var secondsy = Math.round(((latitude - degreey) * 60 - pointsy) * 60, 2);
	    return degreey + '°' + pointsy + "'" + pointsy + '\"' + latitudeSuffix;

	}

	/**
	 * 去除换行
	 * @param HTML
	 * @return 去除换行后的HTML
	 */
	Whayer.breakNtoBr = function (str) {
	    if (!str) return str;
	    str = str.replace(/\\\\n/g, "⊕₰▆₮～");
	    str = str.replace(/\n/g, "<br/>");
	    str = str.replace(/\⊕₰▆₮～/g, "\n");
	    return str;
	}

	/**
	 * 字符串中阿拉伯数字转中文
	 * @param string
	 * @return 转换后的string
	 */
	Whayer.ToChinese = function (str) {
	    var cn = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
	    var result = "";
	    for (var i = 0; i < str.length; i++) {
	        var n = str.charCodeAt(i) - 48;
	        result = result + cn[Number(n)];
	    }
	    return result;
	}

	/**
	 * 去除集合中重复的项
	 */
	Whayer.ToUnique = function (data) {
	    data = data || [];
	    var a = {};
	    for (var i = 0; i < data.length; i++) {
	        var v = data[i];
	        if (typeof (a[v]) == 'undefined') {
	            a[v] = 1;
	        }
	    }
	    data.length = 0;
	    for (var i in a) {
	        data[data.length] = i;
	    }
	    return data;
	}
	
	/**
	 * 创建GUID
	 * @param null
	 * @return GUID
	 */
	Whayer.NewGuid = function () {
	    function G() {
	        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	    }
	    var guid = (G() + G() + "-" + G() + "-" + G() + "-" + G() + "-" + G() + G() + G()).toUpperCase();
	    return guid;
	}
	
	Whayer.convTimeAgo = function(timeDiff) {
    if (timeDiff < 0) {
      return;
    }
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var month = day * 30;
    var year = day * 365;

    var convYear = timeDiff / year;
    var convMonth = timeDiff / month;
    var convWeek = timeDiff / week;
    var convDay = timeDiff / day;
    var convHour = timeDiff / hour;
    var convMin = timeDiff / minute;
    var convSec = timeDiff / second;

    // 将时间转换为几小时、几天、几周前
    if (convYear >= 1) {
      result = parseInt(convYear) + "年前";
    } else if (convMonth >= 1) {
      result = parseInt(convMonth) + "月前";
    } else if (convWeek >= 1) {
      result = parseInt(convWeek) + "周前";
    } else if (convDay >= 1) {
      result = parseInt(convDay) + "天前";
    } else if (convHour >= 1) {
      result = parseInt(convHour) + "小时前";
    } else if (convMin >= 1) {
      result = parseInt(convMin) + "分钟前";
    } else if (convSec >= 1) {
      result = parseInt(convSec) + "秒前";
    } else {
      result = "刚刚";
    }
    return result;
  }
	
	/**
	 * header
	 */
	Whayer.header = (function(){
		//TODO 请自行添加头部js
	})();



	return Whayer;
	
}));

/**
 * 字符串格式化
 */
String.prototype.format = function () {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

/**
 * Date增加天数
 */
Date.prototype.addDays = function(d)
{
    this.setDate(this.getDate() + d);
}

/**
 * Date增加周数
 */
Date.prototype.addWeeks = function(w)
{
    this.addDays(w * 7);
}

/**
 * Date增加月数
 */
Date.prototype.addMonths= function(m)
{
    var d = this.getDate();
    this.setMonth(this.getMonth() + m);

    if (this.getDate() < d)
        this.setDate(0);
}

/**
 * Date增加年数
 */
Date.prototype.addYears = function(y)
{
    var m = this.getMonth();
    this.setFullYear(this.getFullYear() + y);

    if (m < this.getMonth()) 
     {
        this.setDate(0);
     }
}


