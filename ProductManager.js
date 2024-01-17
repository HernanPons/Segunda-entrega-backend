const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf-8');
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios.");
        return;
    }

    if (this.products.some(p => p.code === product.code)) {
        console.error("Ya existe un producto con el mismo código.");
        return;
    }

    const newProduct = {
        id: this.products.length + 1,
        ...product,
    };

    this.products.push(newProduct);
    this.saveProducts();
    console.log("Producto agregado:", newProduct);
  }



    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);

        if (!product) {
            console.error("Producto no encontrado.");
        } else {
            console.log("Producto encontrado:", product);
    }

        return product;
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(p => p.id === id);

    if (index === -1) {
        console.error("Producto no encontrado.");
        return;
    }

        this.products[index] = { ...this.products[index], ...updatedProduct };
        this.saveProducts();
        console.log("Producto actualizado:", this.products[index]);
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);

    if (index === -1) {
        console.error("Producto no encontrado.");
        return;
    }

        const deletedProduct = this.products.splice(index, 1)[0];
        this.saveProducts();
        console.log("Producto eliminado:", deletedProduct);
    }
}




const productManager = new ProductManager('productos.json');

productManager.addProduct({
  title: "Producto 1",
  description: "Descripción 1",
  price: 10,
  thumbnail: "image1.jpg",
  code: "ABC123",
  stock: 20
});

productManager.addProduct({
  title: "Producto 2",
  description: "Descripción 2",
  price: 15,
  thumbnail: "image2.jpg",
  code: "DEF456",
  stock: 15
});


console.log("Productos:", productManager.getProducts());
productManager.getProductById(1);




productManager.updateProduct(1, { price: 12, stock: 25 });
productManager.deleteProduct(2);



console.log("Productos actualizados:", productManager.getProducts());
