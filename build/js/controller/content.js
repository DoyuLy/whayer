/*包括sidebar和topmenu*/
define(["domReady!","jquery",
	"text!../../../view/changepwd.html","text!../../../view/lock.html",
	"app","cookie"],function(doc,$,pwdTmpl,lockTmpl,APP,cookie){
	$(window).resize(function(){
		resizeLayout();
	});
	function resizeLayout(){
		var height = $(window).height()-$("#header").height();
		$("#wrapper").height(height);
	};
	var contentApp={
		menuData:"",
		init:function(){
			var _this = this;
            $("#user_name").html(cookie.get("user_name"));
			resizeLayout();
			_this.initSidebarMenu();
			_this.attatchEvent();
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
			/*user unlock*/
			$(document).on("click","#btn_unlock_login",function(){
				$("#lock").remove();
			});
			$("body").keydown(function(e){
                if(e.keyCode==48&&e.ctrlKey==true){/*unregister*/
                    layer.open({title:"提示",content:"版本未注册!",shade:true,move: false});
                }
            });
		},
		initSidebarMenu:function(){/*可用handbars模板解决*/
			var router = APP.router;
			var _this = this;
			var data =  [
						{url:"#/dashboard",classname:"ico ico-home",title:"主页"},
						{url:"#/state",classname:"ico ico-nav-all",title:"设备状态"},
						{url:"#/deviceonline",classname:"ico ico-nav-privilege",title:"设备管理"},
						{url:"#/warningconfig",classname:"ico ico-nav-efficiency ",title:"告警配置"},
						{url:"#config",classname:"ico ico-nav-information",title:"系统配置",child:[
							{url:"#/role",classname:"ico ico-nav-buy",title:"角色管理"},
							{url:"#/usergroup",classname:"ico ico-nav-all",title:"用户管理"},
							{url:"#/permission",classname:"ico ico-user",title:"权限管理"},
							{url:"#/log",classname:"ico ico-nav-communication",title:"日志管理"},
						]},
					];
			_this.menuData = data;		
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
			var hash = window.location.hash;
			if(!hash){
				window.location.href="#/dashboard";
				_this.setSelectedItem("#/dashboard");
			}else{
				_this.setSelectedItem(hash);
			}			
		},
		setSelectedItem:function(hash){
			/*add class to selected item*/
			var _this = this;
			var data = _this.menuData;
			var item = $("#sidebar-menu li a[href='"+hash+"']");
			item.addClass("active");
			var _parentMenuItem = item.parent().parent();
			if(_parentMenuItem.hasClass("sub-menu")){
				_parentMenuItem.addClass("open");
			}			
		},
		collapseSidebar:function(){
			var wrapper = $("#wrapper");
			var w_class = wrapper.toggleClass("sidebar-collapsed",2000);
		},
		topMenuClick:function(e){
			var _this = this;
			var targetID = e.currentTarget.id;
			if(targetID=="user_logout"){
				cookie.remove("user_name");
				window.location.href="index.html";
			}else if(targetID=="pwd_update"){
				_this.changePwd();
			}else if(targetID=="user_lock"){
				$(lockTmpl).appendTo("body");
				$("#span_lock_user_name").html(cookie.get("user_name"));
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
	return contentApp;
});