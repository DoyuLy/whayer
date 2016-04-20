/**
 * Created by duyu on 2016/4/19.
 */

$(function(){ login.init(); })

var login = {
    remenberMe: false,
    init: function(){
        //ToDo 获取cookie 以便默认登录

        //注册DOM事件函数
        this.attachEvent();
    },
    attachEvent: function(){

        var _this = this; //注意this指向

        $(".loading").remove();

        $('#login').on('click', function () {
            var account = $('#account').val().trim();
            var psw = $('#psw').val().trim();

            //临时自动跳转
            location.href = 'index.html';
            return;


            if(_this.validateLogin(account, psw)){
                Whayer.ajax('/user/login', {account: account, psw: psw}, function(data){
                    //返回对象可以在controller统一处理, 比如:
                    //{
                    //    "httpCode": 200
                    //    "state": false,
                    //    "message": "无此用户",
                    //    "data": null
                    //}
                    if(data.status){
                        // TODO 头部模板更换为已登录
                        var ht = Handlebars.compile($("#header-template").html());
                        $('#header').html(myTemplate(data));
                    }
                })
            }
        });
    },
    validateLogin : function(account, psw){
        var msg = '';
        if(!account) msg = '请输入账号';
        if(!psw) msg = '请输入密码';
        if(msg) {
            alert(msg);
            return false;
        }
        return true;
    }
};