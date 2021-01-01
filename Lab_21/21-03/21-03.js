const express = require("express");
const app = express();
const fs = require("fs");
const cp = require("cookie-parser");

app.use(cp());
app.use(express.urlencoded({extended: true}));
app.get("/login", (req, res, next) => {
    console.log("/login");
    const rs = fs.ReadStream("./index.html");
    rs.pipe(res);
}).post("/login", (req, res, next) => {
    console.log("params", req.body);
    res.cookie("tocken", "xxx-yyy-zzz").redirect("/resource");
}).get("/resource", (req, res, next) => {
    var c = req.cookies;
    if (req.cookies && req.cookies.tocken) {
        if (req.cookies.tocken == "xxx-yyy-zzz") res.send("resource");
        else res.redirect("/login");
    }
    else res.redirect("/login");
})

app.listen(3000, () => {
    console.log("Start server, port: ", 3000);
})
