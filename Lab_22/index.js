var https = require("https");
var fs = require("fs");

var options = {
    key: fs.readFileSync("KYA.key"),
    cert: fs.readFileSync("KYA.crt")
};

https.createServer(options, (req, res) => {
    console.log("Hello from https");
    res.end("Hello from https")
}).listen(3000);