const app = require("express")();
const bodyparser = require("body-parser");
const {ServerDH, ClientDH} = require("./DiffieHellman");
const fs = require("fs");
const cipherFile = require("./23_01").cipherFile;

var serverSecret;
const serverDH = new ServerDH(64, 3);
var secret = "";

app.use(bodyparser.json());

app.get("/", (req, res) => {
    try 
    {
        const serverContext = serverDH.getContext();
        res.send(JSON.stringify(serverContext));
    }
    catch(err) 
    {
        res.status(409)
        res.render('error', { error: err })
    }
})
app.post("/context", (req, res) => {
    try 
    {
        var clientContext = req.body;
        serverSecret = serverDH.getSecret(clientContext);
        var temp = JSON.parse(JSON.stringify(serverSecret)).data;
        temp.forEach(number => {
            secret += number;
        });
        console.log("Secret key = ", secret);
        res.send(secret);
    }
    catch(err) 
    {
        res.status(409)
        res.render('error', { error: err })
    }
})
app.get("/resource", (req, res) => {
    const pass = secret.padStart(32, '0');
    const crs = fs.createReadStream("./in_23_01.txt");
    const cws = fs.createWriteStream("./ch_23_01.txt");
    cipherFile(crs, cws, pass);
    res.send();
})

app.listen(3000);
console.log("Server start on the 3000 port!");