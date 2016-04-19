/**
 * Created by duyu on 2016/4/19.
 */

define(['jquery', 'director'], function($){
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
            var router = Router(this.routes);
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
    }

    return app;
});