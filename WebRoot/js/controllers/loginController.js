/**
 * Created by duyu on 2016/4/19.
 */
$(function(){ login.init(); })

var login = {
    remenberMe: false,
    init: function(){
        //ToDo 获取cookie 以便默认登录

        //注册DOM事件函数
        this.enventHandler();
    },
    enventHandler: function(){

        var _this = this; //注意this指向

        $('#login').on('click', function () {
            var account = $('#account').val().trim();
            var psw = $('#psw').val().trim();

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
        });
    }
}