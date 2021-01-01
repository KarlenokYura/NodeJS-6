const app = require("express")();
const bodyparser = require("body-parser");
const {ServerSign, ClientVerify} = require("./23_02");
const fs = require("fs");

app.use(bodyparser.json());

const rs = fs.createReadStream("./ch_23_02.txt");
const rsc = fs.createReadStream("./dc_23_02.txt");

app.get("/", (req, res) => {
    try 
    {
        let ss = new ServerSign();
        ss.getSignContext(rs, (signcontext) => {
        console.log(signcontext);
        let cv = new ClientVerify(signcontext);
        cv.verify(rsc, (result) => {
            console.log(result);
            res.send(result);
        })
    })
    }
    catch(err)
    {
        res.status(409)
        res.render('error', { error: err })
    }  
})
app.listen(3000);
console.log("Server start on the 3000 port!");