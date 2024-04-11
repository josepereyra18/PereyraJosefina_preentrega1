//Corregido!! con this.product

const fs = require('fs').promises;


class ProductManager {
    constructor (){
        this.productsFile = 'productos.json';
        this.leerProductos();
        this.products = [];
    }

    async leerProductos (){
        try{
            const productos1 = await fs.readFile(this.productsFile, 'utf8');
            this.products = JSON.parse(productos1); 
        } catch (error){
            if (error.code === 'ENOENT'){
                this.products = [];
            } else {
                throw error;
            }
        }
    }


    async addProduct(product){
        try {
            const codigoEncontrado = this.products.find((producto) => producto.code === product.code);
            if (codigoEncontrado) {
                console.log('El codigo ya existe');
                return;
            }
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                console.log('Debe completar todos los datos');
                return;
            }
            const idProducto = this.products.length + 1;
            const producto = { ...product, id: idProducto };
            this.products.push(producto);
            await fs.writeFile(this.productsFile, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.log('Error al agregar producto', error);
        }
    }

    async getProducts(){
        try {
            return this.products;
        } catch (error) {
            console.error("Error al consultar productos", error);
            return [];
        }
    }

    async getProductById(id){
        try {
            const productoEncontrado = this.products.find(producto => producto.id === id);
            if (!productoEncontrado){
                throw new Error('Producto no encontrado');
            } else {
                return productoEncontrado;
            }
        } catch (error) {
            console.error("Error al consultar productos", error);
            return [];
        }
    
    }

    async modificarProduct(id, title, description, price, thumbnail, code, stock){
        try{
            const productoEncontrado = this.products.find((producto)=> producto.id === id);
            if (!productoEncontrado){
                console.error('Not found');
                return;
            }
            if (!title || !description || !price || !thumbnail || !code || !stock){
                console.log('Debe completar todos los datos');
                return;
            }
            productoEncontrado.title = title;
            productoEncontrado.description = description;
            productoEncontrado.price = price;
            productoEncontrado.thumbnail = thumbnail;
            productoEncontrado.code = code;
            productoEncontrado.stock = stock;
            await fs.writeFile(this.productsFile, JSON.stringify(this.products, null, 2));
        } catch(error){
            console.log('Error al modificar producto', error);
        }
    }

    async eliminarProducto(id){
        try{
            const productoEncontrado = this.products.find((product)=> product.id === id);
            if (!productoEncontrado){
                console.error('Not found');
                return;
            } else {
                this.products = this.products.filter((product)=> product.id !== id);
                await fs.writeFile(this.productsFile, JSON.stringify(this.products, null, 2));
            }
        } catch(error){
            console.log('Error al eliminar producto', error);
        }
    }
}


const productManager = new ProductManager();

    productManager.addProduct({
    title: "jujuju",
    description:"Este es un producto prueba",
    price:105,
    thumbnail:"”Sin imagen”",
    code:"j890",
    stock:25

    })

    // productManager.getProducts()
    // .then((productos)=> console.log("Productos :" ,productos))
    // .catch((error)=> console.log('error al consultar productos', error));


    // productManager.getProductById(1)
    // .then((producto)=> console.log("Producto Buscado :", producto))
    // .catch((error)=> console.log('error al consultar producto', error));

    // productManager.modificarProduct(1, "PEPAS!!!!!", "Este es un producto prueba modificado", 300, "”Sin imagen”", "abc123", 25)
    // .then(()=> console.log("Producto modificado"))
    // .catch((error)=> console.log('error al modificar producto', error));

    // productManager.eliminarProducto(1)
    // .then(()=> console.log("Producto eliminado"))
    // .catch((error)=> console.log('error al eliminar producto', error));