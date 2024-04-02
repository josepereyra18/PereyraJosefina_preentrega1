const fs = require('fs').promises

class ProductManager {
    constructor (){
        this.productsFile = 'productos.json';
    }

    async leerProductos (){
        try{
            const productos = await fs.readFile(this.productsFile, 'utf8');
            return JSON.parse(productos);
        } catch (error){
            if (error.code === 'ENOENT'){
                return [];
            }else{
                throw error;
            }
        }
    }

    async addProduct(product){
        try {
            let productos = await this.leerProductos();
            const codigoEncontrado = productos.find((producto) => producto.code === product.code);
            if (codigoEncontrado) {
                console.log('El codigo ya existe');
                return;
            }
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                console.log('debe completar todos los datos');
                return;
            }
            const idProducto = productos.length + 1;
            const producto = { ...product, id: idProducto };
            productos.push(producto);
            await fs.writeFile(this.productsFile, JSON.stringify(productos, null, 2));
        } catch (error) {
            console.log('error al agregar producto', error);
        }
    }

    async getProducts(){
        try {
            return await this.leerProductos()
        } catch (error) {
            console.error("Error al consultar productos", error)
            return []
        }
    }

    async getProductById(id){
        try {
            const productos = await this.leerProductos()
            const productoEncontrado = productos.find(producto => producto.id === id)
            if (!productoEncontrado){
                throw new Error('Producto no encontrado')
            }else{
                return productoEncontrado;
            }
        } catch (error) {
            console.error("Error al consultar productos", error)
            return []
        }
    
    }

    async modificarProduct(id, title, description, price, thumbnail, code, stock){
        try{
            let productos = await this.leerProductos();
            const productoEncontrado = productos.find((producto)=> producto.code === code);
            if (!productoEncontrado){
                console.error('not found');
                return;
            }
            if (!title || !description || !price || !thumbnail || !code || !stock){
                console.log('debe completar todos los datos');
                return;
            }
            productoEncontrado.title = title;
            productoEncontrado.description = description;
            productoEncontrado.price = price;
            productoEncontrado.thumbnail = thumbnail;
            productoEncontrado.code = code;
            productoEncontrado.stock = stock;
            await fs.writeFile(this.productsFile, JSON.stringify(productos, null, 2))
        }catch(error){
            console.log('error al modificar producto', error);
        }
    }


    async eliminarProducto(id){
        try{
            let products = await this.leerProductos();
            const productoEncontrado = products.find((product)=> product.id === id);
            if (!productoEncontrado){
                console.error('not found');
                return;
            }else{
                products = products.filter((product)=> product.id !== id);
                await fs.writeFile(this.productsFile, JSON.stringify(products, null, 2))
            }
        }catch(error){
            console.log('error al eliminar producto', error);
        }
    }
}

const productManager = new ProductManager();

    // productManager.addProduct({
    // title: "producto prueba",
    // description:"Este es un producto prueba",
    // price:200,
    // thumbnail:"”Sin imagen”",
    // code:"456",
    // stock:25

    // })

    // productManager.getProducts()
    // .then((productos)=> console.log("Productos :" ,productos))
    // .catch((error)=> console.log('error al consultar productos', error));


    // productManager.getProductById(5)
    // .then((producto)=> console.log("Producto Buscado :", producto))
    // .catch((error)=> console.log('error al consultar producto', error));

    // productManager.modificarProduct(1, "PEPAS!!!!!", "Este es un producto prueba modificado", 300, "”Sin imagen”", "abc123", 25)
    // .then(()=> console.log("Producto modificado"))
    // .catch((error)=> console.log('error al modificar producto', error));

    // productManager.eliminarProducto(1)
    // .then(()=> console.log("Producto eliminado"))
    // .catch((error)=> console.log('error al eliminar producto', error));
