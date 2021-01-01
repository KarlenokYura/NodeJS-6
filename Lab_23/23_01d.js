const http = require("http");
const query = require("querystring");
const fs = require("fs");
const {ServerDH, ClientDH} = require("./DiffieHellman");
const decipherFile = require("./23_01").decipherFile;

var options = {
    host: "localhost",
    path: "/resource",
    port: 3000,
    method: "GET"
}

const req = http.request(options, (res) => {
    const pass = '468812266839174112'.padStart(32, '0');
    const drs = fs.createReadStream("./ch_23_01.txt");
    const dws = fs.createWriteStream("./dc_23_01.txt");
    decipherFile(drs, dws, pass);
})
req.end();