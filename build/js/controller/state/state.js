define(["app", "template"], function (app, template) {
    var state = {
        init: function () {
            template.load("/controller/state", function (doc) {
                $("#content").html(doc);
            });

        }
    };
    return state;
});