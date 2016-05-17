define(["director", "template", "jquery", "NProgress"],
    function (Router, template, $, NProgress) {

        layer.config({path: "resource/plugins/layer/"});
        NProgress.configure({showSpinner: false});

        var app = {
            region: {
                bodyRegion: $("body"),
                contentRegion: null
            },
            router: null,
            init: function () {
                this.initRoute();

                //初始化登录
                require(["login"], function (login) {
                    login.init();
                })
            },
            initRoute: function () {
                this.router = Router({});
                this.router.configure({
                    before: function () {
                        //检测cookie是否失效

                        //加载动画
                        NProgress.start();
                    },
                    after: function () {
                        //取消加载动画
                        NProgress.done();
                    },
                    notfound: function (error) {
                        layer.msg("没有此路由...");
                    }
                });
                this.router.init();
            },
            //动态注册router回调
            onroutes: function () {
                //NProgress.start();
                debugger;
                var route = window.location.hash.slice(2);
                var name = "./controller/" + route + "/" + route;
                require([name], function (controller) {
                    controller.init();
                    //NProgress.done();
                }, function (error) {
                    layer.msg("加载" + route + "出错！");
                });

            },
            //登录成功渲染layout
            renderLayout: function () {
                template.load("/layout", function (content) {
                    $("body").html(content);
                    require(["layout"], function (layout) {
                        layout.init();
                    });
                });
            }
        };
        return app;
    });