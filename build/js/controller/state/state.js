define(["text!../../../view/state.html",],function(stateTmpl){
	var app={
		init:function(){
			$("#content").html(stateTmpl);
		}
	};
	return app;
});