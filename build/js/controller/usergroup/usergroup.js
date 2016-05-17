define(["app", "template"], function (app, template) {
    var usergroup = {
        init: function () {
            template.load("/controller/usergroup", function (doc) {
                $("#content").html(doc);
            });
        }
    };
    return usergroup;
});