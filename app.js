class productManager {
    constructor (){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const codigoEncontrado= this.products.find((product)=> product.code === code);
        if(codigoEncontrado){
            console.log('El codigo ya existe');
            return;
        }
            if (!title || !description || !price || !thumbnail || !code || !stock){
                console.log('debe completar todos los datos');
                return;
            }
            const idProducto= this.products.length + 1;
            const product= {
                id: idProducto,
                title, 
                description, 
                price, 
                thumbnail, 
                code, 
                stock
            }
            this.products.push(product);
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const ProductoEncontrado = this.products.find((product)=> product.id === id);
        if (!ProductoEncontrado){
            console.error('not found');
            return
        }
        return ProductoEncontrado;

    }
}

const ProductManager = new productManager();

ProductManager.addProduct('Don Sturn', 'ricas', 100, 'fotos de don saturn', 'codigo1', 109);
ProductManager.addProduct('CINDOR', 'manjar', 150, 'fotos de CINDOR', 'codigo2', 100);
//ProductManager.addProduct('Tita', 'galletitas', 'fotos de tita', 'codigo3', 10);  ejemplo de producto incompleto
const productos = ProductManager.getProducts();

console.log(productos);
//console.log(ProductManager.getProductById(9));

