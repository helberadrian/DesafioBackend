const archivo = require("../data/datos.json");
const fs = require("fs");
const {Router} = require("express");
const router = Router();

// Get raiz
router.get("/", (req, res) => {
    res.json({
        "Aviso": "Servidor Listo"
    });
});

router.get("/productos", (req, res) => {
    res.json(archivo);
});

// GET
router.get("/productos/:id", (req, res) =>{
    const id = parseInt(req.params.id);

    const producto = archivo.find(producto => producto.id == id);
    res.json(producto);
});

// POST
router.post("/productos", (req, res) => {
    const producto = req.body;
    let num = archivo.length + 1;
    const id = { id: num}
    const productoFinal = Object.assign(producto, id);
    
    archivo.push(productoFinal);
    res.send(`Se guardo el producto ${JSON.stringify(productoFinal)}`);
});

// PUT
router.put("/productos/:id", (req, res) =>{
    fs.promises.readFile("../data/datos.json", "utf-8")
    .then(contenido =>{
        const id = parseInt(req.params.id); // Tomo información de DOM y navegador
        const productoNuevo = req.body;
        const resultado = [];

        const productos = JSON.parse(contenido); // Descargo el contenido del JSON

        for (const indice of productos) { // Elimino el producto existente creando un nuevo array sin el
            if (indice.id != id){
                resultado.push(indice);
            }
        }

        const productoFinal = Object.assign(productoNuevo, id); // Asigno el id al producto nuevo
        resultado.push(productoFinal); // Agrego el producto al array que se va a escribir

        fs.writeFileSync("../data/datos.json", JSON.stringify(resultado));

        console.log(productos);
        res.send(`Se modifico el producto con el ID ${id}: ${JSON.stringify(productoNuevo)}`);
    })
    .catch( error => {
        console.log("Error en la lectura", error);
    })
});

// DELETE
router.delete("/productos/:id", (req, res) =>{
    const id = parseInt(req.params.id);

    const producto = archivo.find(producto => producto.id == id);
    if (producto == undefined){
        res.send({error: "producto no encontrado"});
    } else{
        archivo.filter(eliminado => eliminado.id !== id);
    }
    console.log(archivo);
    res.send(`Se borro el archivo con el ID ${id}: ${JSON.stringify(archivo)}`);
});

module.exports = router;
