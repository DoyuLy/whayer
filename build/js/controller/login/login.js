define(["domReady!", "app", "jquery", "layer", "template", "cookie"],
    function (doc, app, $, layer, template, cookie) {
        var login = {
            init: function () {
                var _this = this;
                template.load("/controller/login", function (login) {
                    $("#content").html(login);
                    $(".loading").hide();
                    _this.attatchEvent();
                });

            },
            attatchEvent: function () {
                var _this = this;
                $("#btnLogin").on("click", function () {
                    _this.login();
                });
                $("#ipt_password").keydown(function (e) {
                    if (e.keyCode == 13) {/*enter down*/
                        _this.login();
                    }
                });
            },
            remenber: function () {
                // TODO 记住账号密码
            },
            login: function () {
                var _this = this;
                var _res = _this.validate();

                // TODO 请使用util的公共ajax进行登录请求

                if (_res.valid) {
                    cookie.set("user_name", $("#ipt_username").val());
                    app.renderLayout();
                } else {
                    layer.msg(_res.msg, {time: 1500});
                }
            },
            validate: function () {
                var _valid = {valid: false, msg: ""};
                var _username = $("#ipt_username").val();
                var _password = $("#ipt_password").val();
                if (_username == "" || _password == "") {
                    _valid.msg = "用户密码不能为空";
                } else {
                    _valid.valid = true;
                }
                return _valid;
            }
        };
        return login;
    });