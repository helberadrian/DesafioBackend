const express = require("express");
const {Server: HttpServer} = require("http"); // {Server: HttpServer} de esta forma se renombra Server como HttpServer
const {Server: IOserver} = require("socket.io");
const PORT = 3000;

const app = express();
const httpServer = new HttpServer(app); // es un requisito de socket.io
const io = new IOserver(httpServer); // requisito para que funcione socket.io

app.use(express.static("public")); // para poder usar el html y el css de la carpeta public

app.get("/", (req, res) =>{
    res.sendFile("./public/index.html", {root: __dirname});
})

// starting the server
const server = app.listen(PORT, () =>{
    console.log(`Servidor conectado en puerto ${server.address().port}`);
});

io.on("Connection", (socket) =>{
    console.log("Usuario Conectado");
})