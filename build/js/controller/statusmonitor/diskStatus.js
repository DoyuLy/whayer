define(["template"],function(template){
	var diskStatus = {
		init:function(){
			template.load(["/controller/statusmonitor/diskStatus"],function(diskStatusTmpl){
				 $("#diskStatus").html(diskStatusTmpl);				
			});
		}
	};
	return diskStatus;
});