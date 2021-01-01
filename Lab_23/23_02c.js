const http = require("http");
const {ServerSign, ClientVerify} = require("./23_02");
const fs = require("fs");

var options = {
    host: "localhost",
    path: "/",
    port: 3000,
    method: "GET"
}

const req = http.request(options, (res) => {
    
})
req.end();