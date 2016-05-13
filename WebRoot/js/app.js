define(["template","jquery","director","./controller/index/index",
	"handlebars","layer","bootstrap","util","underscore",
    "NProgress","css!../resource/plugins/nprogress/nprogress",],
	function(template,$,director,index,handlebars,layer,bootstrap,util,_,NProgress){
	var router_global;
	/*layer requireJS加载方式*/
    layer.config({
      path:"resource/plugins/layer/",//layer.js所在的目录，可以是绝对目录，也可以是相对目录
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
	            setTimeout(function(){
	            	//NProgress.done();
	            },1000);
	        },function(error){
	        	layer.msg(error.message);
	        });
    	}
    };
    var routeError=function(){
    	console.log("not found");    	
    }
    function  initRoute(){
        var routes = {};
        router_global = Router(routes).configure({"notfound":routeError});
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
    			require(["text!../view/layout.html","./js/controller/content.js"],function(layouttmpl,sidebar_top_content){
                	$("body").html(layouttmpl);
                	sidebar_top_content.init();
                	/*window.location.href="#/dashboard";*/
                	allroutesFunction();
                });
    		}else{    			
    			index.init();
    		}    		
    	},onroutes:function(){
    		allroutesFunction();
    	}
    };
    return app;
});