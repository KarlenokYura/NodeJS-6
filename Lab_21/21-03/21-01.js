const app = require("express")();
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const {getCredential, verPassword} = require("./db.js");
const session = require("express-session")(
    {
        resave: false,
        saveUninitialized: false,
        secret: "12345678"
    }
);

passport.use(new BasicStrategy((user, password, done) => {
    var rc = null;
    var cr = getCredential(user);
    if (!cr) rc = done(null, false, {message: "incorrect username"});
    else if (!verPassword(cr.password, password)) rc = done(null, false, {message: "incorrect password"});
    else rc = done(null, user);
    return rc;
}));

passport.serializeUser((user, done) => {
    console.log("serialize", user);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log("deserialize", user);
    done(null, user);
});

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res, next) => {
    console.log("preAuth");
    if (req.session.logout && req.headers["authorization"]) {
        req.session.logout = false;
        delete req.headers["authorization"];
    }
    next();
},
passport.authenticate("basic"), (req, res, next) => {
    next();
}).get("/", (req, res, next) => {
    console.log("get-2");
    next();
}).get("/", (req, res, next) => {
    console.log("get-3");
    res.send("hello");
}).get("/logout", function(req, res) {
    console.log("get-4");
    res.session.logout = true;
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Start server, port: ", 3000);
})