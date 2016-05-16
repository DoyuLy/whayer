define([],function(){
	var cookie={
		set:function(key,value,expires){
			/*
			var cookie = key+'=';
		    // value值存在
		    value && (cookie += escape(value));
		    // expires存在,默认过期时间单位expires为小时
		    expires && (cookie += ';expires=' + new Date(+new Date + expires*1000));		 
		    document.cookie = cookie;*/

		    var exp = new Date(); 
		    expires = expires?expires:24;
			exp.setTime(exp.getTime() + expires*1000*3600);
			document.cookie = key + '='+ escape (value) + ';expires=' + exp.toGMTString();
		},
		get:function(key){
			return new RegExp('(^| )' + key + '=(.+?)(;|$)').test(document.cookie) ? unescape(RegExp.$2) : null;
		},
		remove:function(key){
			this.set(key, '', -24);
		}
	};
	return cookie;
});