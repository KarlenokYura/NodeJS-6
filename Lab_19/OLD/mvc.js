function MVCRouter(uri_templates)
{
    this.uri_templates = [...arguments];
}

function MVCControllers(controllers_map) {
    this.controllers_map = controllers_map;
}

function MVC(router, controllers) {
    this.router = router;
    this.controllers = controllers;
    this.use = (req, res, next) => {
        var method = req.params.method;
        if (method === "get" || method === "post") {
            var c = this.controllers.controllers_map[req.params.controller];
            if (c) {
                var a = c[req.params.action];
                if (a) {
                    a(req, res, next);
                }
                else{
                    next();
                }
            }
            else {
                next();
            }
        }
        else {
            res.status(404).json({error: "Method is not defined"});
        }
    }
}

exports.MVCRouter = MVCRouter;
exports.MVCControllers = MVCControllers;
exports.MVC = MVC;