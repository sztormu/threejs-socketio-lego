var express = require("express")
var app = express();
var http = require('http').createServer(app);
var socketio = require('socket.io')(http);

app.use(express.static("static"))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/static/index.html")
})

socketio.on('connection', function (client) {
    console.log("klient się podłączył" + client.id)
    // client.id - unikalna nazwa klienta generowana przez socket.io
    client.emit("onconnect", {
        clientName: client.id
    })

    client.on("disconnect", function () {
        console.log("klient się rozłącza")
    })


    client.on("kloc", function (data) {
        console.log(data)
        client.broadcast.emit("klocZserwera", { posX: data.posX, posY: data.posY, posZ: data.posZ });
    })
    client.on("kolor", function (data) {
        console.log(data)
        client.broadcast.emit("kolorZserwera", { color: data.color });
    })
    client.on("wielkosc", function (data) {
        console.log(data)
        client.broadcast.emit("wielkoscZserwera", { posX: data.posX, posY: data.posY, posZ: data.posZ });
    })
    client.on("obrot", function (data) {
        console.log(data)
        client.broadcast.emit("obrotZserwera", { licznik: data.licznik });
    })
    client.on("moving", function (data) {
        console.log(data)
        client.broadcast.emit("movingZserwera", { namber: data.namber, posX: data.posX, posZ: data.posZ });
    })

    // client.on("pos", function (data) {
    //     console.log(data)
    //     client.emit("newBlock", { posX: data.posX, posY: data.posY, posZ: data.posZ });
    // })
    // client.on("color", function (data) {
    //     console.log(data)
    //     //client.broadcast.emit("newColor", { color: data.col });
    // })

});


http.listen(3000, function () {
    console.log('listening on 3000');
});
