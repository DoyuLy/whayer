define(["app", "template"], function (app, template) {
    var state = {
        init: function () {
            template.load("/controller/state", function (doc) {
                app.region.contentRegion.html(doc);
            });

        }
    };
    return state;
});