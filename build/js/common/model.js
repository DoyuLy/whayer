define([], function(){
	'use strict';

	var exports = {};

	exports.sort = function(name, type){
		this.name = name;
		this.type = type;
	}

	exports.reqModel = function(params, limit, offset, sort){
		this.params = params;
		this.limit = limit ? limit : 10;
		this.offset = offset ? offset : 0;
		this.sort = sort ? sort : null;
	} 

	return exports;
});