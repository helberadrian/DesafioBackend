const fs = require("fs");

module.exports = class ListaProductos {
    constructor(productos) {
        this.file = "../data/datos.json";
        this.productos = productos;
        }
    
    getAll(ListaProductos){
        const datos = fs.readFileSync(this.file, "utf-8");
        ListaProductos = JSON.parse(datos);

        return ListaProductos;
    }
}