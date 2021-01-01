const app = require("express")();
const passport = require("passport");
const DigestStrategy = require("passport-http").DigestStrategy;
const {getCredential, verPassword} = require("./db.js");

passport.use(new DigestStrategy({gop: "auth"}, (user, done) => {
    var rc = null;
    var cr = getCredential(user);
    if (!cr) rc = done(null, false);
    else rc = done(null, cr.user, cr.password);
    return rc;
}, (params, done) => {
    console.log("params: ", params);
    done(null, true);
}));

app.get("/", passport.authenticate("digest", {session: false})
).get("/", (req, res, next) => {
    console.log("get-2");
    next();
}).get("/", (req, res, next) => {
    console.log("get-3");
    res.send("hello");
})

app.listen(3000, () => {
    console.log("Start server, port: ", 3000);
})