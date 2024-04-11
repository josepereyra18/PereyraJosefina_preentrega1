const express = require('express');
const ProductManager = require('./app.js')
const productManager = new ProductManager();

const app = express();
const PORT = 8080; 

app.get('/products', async (req, res) => {  //aca cuando sea localhost:8080/products?limit=2
    try{
        let limite = req.query.limit;
        let productos = await productManager.getProducts();
        if (limite){
            res.json(productos.slice(0, limite));
        }else{
            res.json(productos);
        }
    }catch(error){
        console.log('Error al consultar productos', error); 
    }
})

app.get('/product/:pid', async (req, res) => {
    try{
        let pid = req.params.pid;
        let producto = await productManager.getProductById(pid);
        res.json(producto);
    }catch(error){
        console.log('Error al consultar producto', error);
    }
})

app.listen(PORT, ()=>{
    console.log('servidor escuchando en el puerto', PORT)
})


