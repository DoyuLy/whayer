define(["template"],function(template){
	var onOffLineStatus = {
		init:function(){
			template.load(["/controller/statusmonitor/onOffLineStatus"],function(onOffLineStatusTmpl){
				 $("#onOffLineStatus").html(onOffLineStatusTmpl);				
			});
		}
	};
	return onOffLineStatus;
});