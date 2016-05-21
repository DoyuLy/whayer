define(["template"],function(template){
	var videoQuality = {
		init:function(){
			template.load(["/controller/statusmonitor/videoQuality"],function(videoQualityTmpl){
				 $("#videoQuality").html(videoQualityTmpl);				
			});
		}
	};
	return videoQuality;
});