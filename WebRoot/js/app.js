/**
 * Created by duyu on 2016/4/19.
 */

define(['jquery', 'director'], function($, director){
    var app = {
        routes: {
            '/login': app.login,
            '/index': app.index,
            '/device/status': app.status,
            '/device/manage': app.manage,
            '/device/alarm': app.alarm,
            '/system/config': app.config
        },
        version: '0.1.0',
        init: function(){
            var router = director.Router(this.routes);
            router.configure({
                before: function(){
                    //全局拦截器,验证cookie是否存在,服务端验证session是否存在(若只是cookie验证,cookie在服务端秘钥解密后进行对比)

                }
            });
            router.init();


        },
        login: function(){

        },
        index: function(){

        },
        status: function(){

        },
        manage: function(){

        },
        alarm: function(){

        },
        config: function(){

        }
    };

    return app;
});