/*包括sidebar和topmenu*/
define(["domReady!","jquery",
	"text!../../../view/changepwd.html","app"],function(doc,$,pwdTmpl,APP){
	$(window).resize(function(){
		resizeLayout();
	});
	function resizeLayout(){
		var height = $(window).height()-$("#header").height();
		$("#wrapper").height(height);
	};
	var app1={
		init:function(){
			var _this = this;
			resizeLayout();
			_this.initSidebarMenu();
			_this.attatchEvent();
		},
		initSidebarMenu:function(){/*可用handbars模板解决*/
			var router = APP.router;
			var _this = this;
			var data = menuData = [
						{url:"#/dashboard",classname:"fa fa-home",title:"主页"},
						{url:"#/state",classname:"fa fa-calendar-o",title:"设备状态"},
						{url:"#/deviceonline",classname:"fa fa-steam-square",title:"设备管理"},
						{url:"#/config",classname:"fa fa-wrench",title:"系统配置",child:[
							{url:"#/warningconfig",classname:"fa fa-warning",title:"告警配置"},
							{url:"#/usergroup",classname:"fa fa-user",title:"用户组管理"},
							{url:"#/log",classname:"fa fa-info-circle",title:"日志管理"},
						]},
					];
			var sidebarStr = "";
			for (var i = 0;i<data.length;i++) {
				var obj = data[i];	
				var child = obj.child;			
				if(!child){
					sidebarStr+="<li><a href='"+obj.url+"'><i class='"+obj.classname+"'></i><span>"+obj.title+"</span></a></li>";
					/*dynamic register router*/
					var _p1 = obj.url.substr(1);
            		router.on(_p1,APP.onroutes);
				}else{
					sidebarStr+="<li><a href='"+obj.url+"'><i class='"+obj.classname+"'></i><span>"+obj.title+"</span>"+
								"<span class='fa fa-angle-down arrow'><span></a>";
								sidebarStr+="<ul class='sub-menu'>";
								for (var j=0;j<child.length;j++) {
									var _child = child[j];
									sidebarStr+="<li><a href='"+_child.url+"'><i class='"+_child.classname+"'></i><span>"+_child.title+"</span></a></li>";
									/*dynamic register router*/
									var _p2 = _child.url.substr(1);
            						router.on(_p2,APP.onroutes);
								}
								sidebarStr+="</ul></li>";
				}

			}
			$("#sidebar-menu").html(sidebarStr);
			/*wher first load,redirect to dashboard*/
			var hash = window.location.hash;
    		if(!hash){
				window.location.href="#/dashboard";
				$("#sidebar-menu li a:first").addClass("active");
    		}
    		/*add class to selected item*/
    		$("#sidebar-menu li a[href='"+hash+"']").addClass("active");
		},
		attatchEvent:function(){	
			var _this = this;		
			$("#menu-toggler").on("click",function(){
				_this.collapseSidebar();
			});
			$(".dropdown-menu li").on("click",function(evt){
				_this.topMenuClick(evt);
			});
			$("#sidebar-menu li a").on("click",function(evt){
				_this.collapseMenu(evt);
			});	
		},
		collapseSidebar:function(){
			var wrapper = $("#wrapper");
			var w_class = wrapper.toggleClass("sidebar-collapsed",2000);
		},
		topMenuClick:function(e){
			var _this = this;
			var targetID = e.currentTarget.id;
			if(targetID=="user_logout"){
				window.location.href="index.html";
			}else if(targetID=="pwd_update"){
				_this.changePwd();
			}else{

			}
		},
		changePwd:function(){
			layer.open({
				title:"密码修改",
				type:1,
				area:["400px","225px"],
				shade:[0.9, '#000'],
				move: false,
				content:pwdTmpl,
				btn:["保存","取消"],
				yes:function(layero){
					var newPwd = $("#ipt_newPwd").val();
					var confirmPwd = $("#ipt_newPwd_confirm").val()
					if(newPwd!=confirmPwd){
						layer.msg("两次密码不一致");return;
					}
					var user_name = $("#user_name").html();
					$.ajax({
						url:"/user/changePassword",
						data:{password:newPwd,confirm:confirmPwd},
						success:function(){
							layer.msg("密码更新成功");
							layer.close(layero);
						}
					});
				}
			});
		},
		collapseMenu:function(evt){
			//evt.preventDefault();
			//evt.stopPropagation();
			var menuItem = $(evt.currentTarget);
			var angle = menuItem.find("span.arrow");
			if(angle.length>0){//item has child menu
				var w_class = menuItem.siblings().toggleClass("open");
			}else{
				$("#sidebar-menu li a").removeClass("active");
				$(evt.currentTarget).addClass("active");
			}
			var href=menuItem.attr("href")||menuItem.find("a").attr("href");
			if(href&&href!="#"){
				
			}
		}
	};
	return app1;
});