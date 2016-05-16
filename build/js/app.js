define(["template","jquery","director","./controller/index/index",
	"handlebars","layer","util","underscore",
    "NProgress","cookie","bootstrap",
    "css!../resource/plugins/nprogress/nprogress",
    "css!../resource/plugins/bootstrap/css/bootstrap.min",
    'css!../resource/plugins/fontAwesome/css/font-awesome.min'],
	function(template,$,Router,index,handlebars,layer,util,_,NProgress,cookie){
	var router_global;
	/*layer amd加载*/
    layer.config({
      path:"resource/plugins/layer/",//layer.js所在的目录
    });
	/*nprogress configure*/	
	NProgress.configure({ showSpinner: false });
	var allroutesFunction = function(){	
		NProgress.start();
	    var route = window.location.hash.slice(2);
    	var m_name = "./controller/"+route+"/"+route;
    	if($("#content").length>0){    		
	       	require([m_name],function(m){
	            m.init();
	            NProgress.done();
	        },function(error){
	        	layer.msg(error.message);
	        });
    	}
    };
    var routeError=function(error){
    	console.log("not found");
    }
    function  initRoute(){
        var routes = {};
        router_global = Router(routes);
        router_global.configure({"notfound":routeError});
        router_global.init();
    };   
    var app={
    	router:null,
    	init:function(){
    		initRoute();
    		/*define app global router*/
    		this.router=router_global;
    		var hash = window.location.hash;
    		if(hash){
                var cookie_user_name = cookie.get("user_name");
                if(cookie_user_name){
                    require(["text!../view/layout.html","./js/controller/content.js"],function(layouttmpl,sidebar_top_content){
                        $("body").html(layouttmpl);
                        sidebar_top_content.init();
                        allroutesFunction();
                    });
                }else{
                    //window.location.hash="";
                    //index.init();
                    window.location.href="index.html";
                }
    			
    		}else{    			
    			index.init();
    		}    		
    	},onroutes:function(){
    		allroutesFunction();
    	}
    };
    return app;
});