define(["template","jquery","layer","ztree"],function(template,$,layer,ztree){
	var statusMmonitor = {
		zTreeObj:null,
		curTabInex:null,
		curNode:null,
		childApp:{},
		init:function(){
			var _this = this;
			_this.restoreDefault();
			template.load(["/controller/statusmonitor/statusmonitor"],function(statemonitor){
				$("#content").html(statemonitor);
				_this.resizeLayout();
				_this.attatchEvent();
				_this.initTree();
				_this.initTabs(_this.curTabInex);
			});
		},
		restoreDefault:function(){
			var _this = this;
			_this.curTabInex = 0;
			_this.zTreeObj = null;
			_this.curNode = null;
			_this.childApp = {};
		},
		resizeLayout:function(){
			var tabWidth = $(".statusmonitor").width()-$(".treeborder").width()-35;
			$("#smTabContent").width(tabWidth);
		},
		attatchEvent:function(){
			var _this = this;
			$("#smTab li a").on("click",function(e){
				_this.curTabInex = $(e.currentTarget).parent().index();
				_this.initTabs(_this.curTabInex);
			});
			$(window).resize(function () {
                _this.resizeLayout();
            });
		},
		zTreeOnClick:function(event, treeId, treeNode){
			var _this = this;
			_this.curNode = treeNode;
			_this.initTabs(_this.curTabInex);
		},
		initTree:function(){
			var _this = this;
			var zTreeNodes = [
				{id:1, pId:0, name: "四川省电力公司中心平台"},
				{id:2, pId:1, name: "成都市"},
				{id:3, pId:2, name: "华三平台"},
				{id:6, pId:1, name: "武侯变220KV变电站"}
			];
			var setting = {	data: {
			        simpleData: {
			            enable: true,
			            pIdKey: 'pId'
			        }
			    },callback:{
			    	onClick:function(event, treeId, treeNode){
			    		_this.zTreeOnClick(event, treeId, treeNode);
			    	}
			    }
			};
			var treeObj = $.fn.zTree.init($("#tree1"), setting, zTreeNodes);
			/*choose root node*/
			var nodes = treeObj.getNodes();
			if (nodes.length>0) {
				treeObj.selectNode(nodes[0]);
				_this.curNode = nodes[0];
			}
			treeObj.expandAll(true);
			_this.zTreeObj = treeObj;
		},
		initTabs:function(index){
			var _this = this;
			if(index==0){
				var child_diskStatus = _this.childApp["diskStatus"];
				if(child_diskStatus){
					child_diskStatus.updateNode(_this.curNode);
				}else{
					var diskStatus1 = "./controller/statusmonitor/diskStatus";
					require([diskStatus1],function(diskStatus){
						_this.childApp["diskStatus"] = diskStatus;
						diskStatus.init(_this.curNode);
					});
				}				
			}else if(index==1){		
				var child_onOffLineStatus = _this.childApp["onOffLineStatus"];
				if(child_onOffLineStatus){
					child_onOffLineStatus.updateNode(_this.curNode);
				}else{
					var onOffLineStatus1 = "./controller/statusmonitor/onOffLineStatus";		
					require([onOffLineStatus1],function(onOffLineStatus){
						_this.childApp["onOffLineStatus"] = onOffLineStatus;
						onOffLineStatus.init(_this.curNode);
					});
				}				
			}else if(index==2){
				/*var child_videoQuality = _this.childApp["videoQuality"];
				if(child_videoQuality){
					child_videoQuality.updateNode(_this.curNode);
				}else{
					var videoQuality1 = "./controller/statusmonitor/videoQuality";
					require([videoQuality1],function(videoQuality){
						_this.childApp["videoQuality"] = child_videoQuality;
						videoQuality.init(_this.curNode);
					});
				}*/
				
			}else{

			}
		}
	};
	return statusMmonitor;
});