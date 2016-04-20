/**
 * Created by duyu on 2016/4/19.
 */

define(['jquery', 'director'], function($){
    var status = function(){
        alert('status');
    };
    var manage = function(){
        alert('manage');
    };
    var alarm = function(){
        alert('alarm');
    };
    var setting = function(){
        alert('setting');
    };
    var userManage = function(){
        alert('user manage');
    };
    var logManage = function(){
        alert('log manage');
    };

    var app = {
        routes: {
           /* '/login': this.login,
            '/index': this.index,*/
            '/device/status': [status],
            '/device/manage': [manage],
            '/device/alarm': [alarm],
            '/alarm/setting': [setting],
            '/user/manage': [userManage],
            '/log/manage': [logManage]
        },
        version: '0.1.0',
        init: function(){
            var router = Router(this.routes);
            router.configure({
                before: function(){
                    //全局拦截器,验证cookie是否存在,服务端验证session是否存在(若只是cookie验证,cookie在服务端秘钥解密后进行对比)

                }
            });
            router.init();
        }
    };

    return app;
});