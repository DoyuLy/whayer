define(["text!../../../view/usergroup.html",],function(userGroupTmpl){
	var app={
		init:function(){
			$("#content").html(userGroupTmpl);
		}
	};
	return app;
});