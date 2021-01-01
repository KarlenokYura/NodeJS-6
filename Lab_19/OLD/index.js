var app = require("express")();
var handlers = require("./handlers");
var router = new (require("./mvc").MVCRouter)(
    "/:controller/:action/:method",
    "/:controller/:action/:method/:param"
);
var controllers = new (require("./mvc")).MVCControllers(
    {
        home: {
            index: handlers.home_index,
            account: handlers.home_account
        },
        calc: {
            salary: handlers.calc_salary,
            trans: handlers.calc_trans
        }
    }
);
var mvc = new (require("./mvc")).MVC(router, controllers);
app.get(mvc.router.uri_templates, mvc.use);
var server = app.listen(3000);
console.log("Server start at localhost:3000");