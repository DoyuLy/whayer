define(["domReady!",
	"jquery",
	"layer",
    "text!../../../view/layout.html","cookie",
    'css!../../../resource/style/main',
], function (doc,$,layer,layouttmpl,cookie) {
	 /*
    domReady(){

    };*/   
    /*layer requireJS加载方式*/
    /*layer.config({
      path:"resource/plugins/layer/",//layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });*/
    var MA = {
        init:function(){
            var _this = this;
            $(".loading").hide();
            _this.attatchEvent();
        },
        attatchEvent:function(){
            var _this =this;
            $("#btnLogin").on("click",function(){
                _this.login();
            });
            $("#ipt_password").keydown(function(e){
                if(e.keyCode==13){/*enter down*/
                    _this.login();
                }
            });
        },
        login:function(){
            var _this = this;
            var _res = _this.validate();
            if(_res.valid){   
                cookie.set("user_name",$("#ipt_username").val());
                $("body").html(layouttmpl);                
                require(["./js/controller/content.js"],function(sidebar_top_content){
                	sidebar_top_content.init();
                });
            }else{
                layer.msg(_res.msg,{time:1500});
            }
        },
        validate:function(){
            var _valid = {valid:false,msg:""};
            var _username = $("#ipt_username").val();
            var _password = $("#ipt_password").val();
            if(_username==""||_password==""){
                _valid.msg = "用户密码不能为空";
            }else{
                _valid.valid = true;
            }
            return _valid;
        }
    };    
    return MA;
});