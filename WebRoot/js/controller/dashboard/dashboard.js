define(["domReady!","jquery","text!../../../view/dashboard.html"],function(doc,$,dashboardTmpl){
	var app={
		init:function(){
			$("#content").html(dashboardTmpl);
		}
	};
	return app;
});