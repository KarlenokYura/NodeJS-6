const http = require("http");
const query = require("querystring");
const fs = require("fs");
const {ServerDH, ClientDH} = require("./DiffieHellman");

var options = {
    host: "localhost",
    path: "/",
    port: 3000,
    method: "GET"
}

var data = "";
var clientContext;
var clientSecret;

const req = http.request(options, (res) => {
    res.on("data", (chunk) => {
        data += chunk.toString("utf8");
    });
    res.on("end", () => {
        var serverContext = JSON.parse(data);
        const clientDH = new ClientDH(serverContext);
        clientSecret = clientDH.getSecret(serverContext);
        clientContext = clientDH.getContext();
        console.log(clientContext);
        var temp = JSON.parse(JSON.stringify(clientSecret)).data;
        var secret = "";
        temp.forEach(number => {
            secret += number;
        });
        console.log("Secret key = ", secret);
    });
})
req.end();