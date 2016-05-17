define(["app", "template"], function (app, template) {
    var usergroup = {
        init: function () {
            template.load("/controller/usergroup", function (doc) {
                debugger;
                app.region.contentRegion.html(doc);
            });
        }
    };
    return usergroup;
});