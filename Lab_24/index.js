const { createClient } = require("webdav");
const app = require("express")();
const fs = require("fs");

const client = createClient("https://webdav.yandex.ru", { 
    username: "karlenok.yura", password: "Pa$$w0rd"
});

app.post("/md/:ttttt", (req, res, next) => {
    client.exists("/" + req.params.ttttt)
    .then((result) => {
        if (result) {
            res.status(408);
            res.send("This directory is exists");
        }
        else {
            client.createDirectory("/" + req.params.ttttt);
            res.send();
        }
    });
})

app.post("/rd/:ttttt", (req, res, next) => {
    client.exists("/" + req.params.ttttt)
    .then((result) => {
        if (result) {
            client.deleteFile("/" + req.params.ttttt);
            res.send("");
        }
        else {
            res.status(408);
            res.send("This directory is not exists");
        }
    });
})

app.post("/up/:tttt", (req, res, next) => {
    try {
        var rs = fs.createReadStream("./image.jpg");
        var ws = client.createWriteStream("/Yura/" + req.params.tttt + ".jpg");
        rs.pipe(ws);
        res.send("");
    }
    catch (err) {
        res.status(408);
        res.send("Upload image error");
    }
})

app.post("/down/:tttt", (req, res, next) => {
    client.exists("/Yura/image.jpg")
    .then((result) => {
        if (result) {
            client.createReadStream("/Yura/image.jpg").pipe(fs.createWriteStream("./" + req.params.tttt + ".jpg"))
            res.send();
        }
        else {
            res.status(404);
            res.send("Download image error");
        }
    })
})

app.post("/del/:tttt", (req, res, next) => {
    client.exists("/Yura/" + req.params.tttt + ".jpg")
    .then((result) => {
        if (result) {
            client.deleteFile("/Yura/" + req.params.tttt + ".jpg");
            res.send("");
        }
        else {
            res.status(404);
            res.send("This file is not exists");
        }
    });
})

app.post("/copy/:tttt/:pppp", (req, res, next) => {
    client.exists("/Yura/" + req.params.tttt + ".jpg")
    .then((result) => {
        if (result) {
            client.exists("/Yura/" + req.params.pppp + ".jpg")
            .then((result2) => {
                if (result2) {
                    res.status(408);
                    res.send("Copy image error");
                }
                else {
                    client.copyFile("/Yura/" + req.params.tttt + ".jpg", "/Yura/" + req.params.pppp + ".jpg");
                    res.send();
                }
            });
        }
        else {
            res.status(404);
            res.send("This file is not exists");
        }
    });
})

app.post("/move/:tttt/:pppp", (req, res, next) => {
    client.exists("/Yura/" + req.params.tttt + ".jpg")
    .then((result) => {
        if (result) {
            client.exists("/" + req.params.pppp + ".jpg")
            .then((result2) => {
                if (result2) {
                    res.status(408);
                    res.send("Copy image error");
                }
                else {
                    client.moveFile("/Yura/" + req.params.tttt + ".jpg", "/" + req.params.pppp + ".jpg");
                    res.send();
                }
            });
        }
        else {
            res.status(404);
            res.send("This file is not exists");
        }
    });
})

app.listen(3000);
console.log("Server starts on localhost:3000");