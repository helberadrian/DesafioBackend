const express = require("express");
const productos = require("./routes/app");
const morgan = require("morgan");
const PORT = 3000;
const almacen = require("./class/class");
const product = new almacen();

// Websocket
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

// settings
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.set("json spaces", 2);
app.use(require("./routes/app"));

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname, + "./public"));
app.use("/api", productos);

// Websocket - Server
const ListaProductos = [];

io.on("connection", (socket) => {
    socket.on("new_product", (data) =>{
        product.getAll(ListaProductos);
        ListaProductos.push(data);
        io.sockets.emit("product_received", ListaProductos);
    });
});

// starting the server
const server = app.listen(PORT, () =>{
    console.log(`Servidor conectado en puerto ${server.address().port}`);
});