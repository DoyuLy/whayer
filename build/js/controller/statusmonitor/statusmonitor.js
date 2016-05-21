define(["template","jquery","layer"],function(template,$,layer){
	var statusMmonitor = {
		init:function(){
			var _this = this;
			template.load(["/controller/statusmonitor/statusmonitor"],function(statemonitor){
				 $("#content").html(statemonitor);
				_this.attatchEvent();
				_this.initTabs(0);
			});
		},
		attatchEvent:function(){
			var _this = this;
			$("#smTab li a").on("click",function(e){
				var index = $(e.currentTarget).parent().index();
				_this.initTabs(index);
			});
		},
		initTabs:function(index){
			if(index==0){
				var diskStatus1 = "./controller/statusmonitor/diskStatus";
				require([diskStatus1],function(diskStatus){
					diskStatus.init();
				});
			}else if(index==1){		
				var onOffLineStatus1 = "./controller/statusmonitor/onOffLineStatus";		
				require([onOffLineStatus1],function(onOffLineStatus){
					onOffLineStatus.init();
				});
			}else if(index==2){
				var videoQuality1 = "./controller/statusmonitor/videoQuality";
				require([videoQuality1],function(videoQuality){
					videoQuality.init();
				});
			}else{

			}
		}
	};
	return statusMmonitor;
});