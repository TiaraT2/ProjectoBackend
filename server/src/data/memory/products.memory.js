import fs from "fs";
import crypto from "crypto";

class ProductManager {
  static #products = [];

  constructor() {
    this.path = "./FS Manager/files/products.json";
    this.conf = "utf-8";
    this.init();
  }

  init() {
    try {
      const fileExists = fs.existsSync(this.path);

      if (fileExists) {
        const fileContent = fs.readFileSync(this.path, this.conf);
        ProductManager.#products = JSON.parse(fileContent);
        ProductManager.#products.forEach((product) => {
          if (!product.id) {
            product.id = crypto.randomBytes(12).toString("hex");
          }
        });
      } else {
        ProductManager.#products = [];
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      }
    } catch (error) {
      console.error("Error initializing ProductManager:", error.message);
    }
  }

  create(data) {
    try {
      if (data.title && data.photo && data.price && data.stock) {
        const newProduct = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          price: data.price,
          stock: data.stock,
        };

        ProductManager.#products.push(newProduct);

        fs.writeFileSync(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );

        return newProduct;
      } else {
        throw new Error("Please provide all required fields");
      }
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("No products found");
      } else {
        return ProductManager.#products;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const productId = String(id);
      const product = ProductManager.#products.find(
        (product) => product.id === productId
      );

      if (product) {
        return product;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      return error.message;
    }
  }

  updateStock(id, newStock) {
    try {
      const productIndex = ProductManager.#products.findIndex(
        (product) => product.id === id
      );

      if (productIndex === -1) {
        throw new Error("Product not found!");
      }
      const updatedProduct = {
        ...ProductManager.#products[productIndex],
        stock: newStock,
      };

      ProductManager.#products[productIndex] = updatedProduct;

      return "Stock updated";
    } catch (error) {
      throw error;
    }
  }
  destroy(id) {
    try {
      const productIndex = ProductManager.#products.findIndex(
        (product) => product.id === id
      );

      if (productIndex === -1) {
        throw new Error("Product not found");
      }

      ProductManager.#products.splice(productIndex, 1);

      fs.writeFileSync(
        this.path,
        JSON.stringify(ProductManager.#products, null, 2)
      );

      return "Product deleted";
    } catch (error) {
      return error.message;
    }
  }
}

const Manager = new ProductManager();
console.log(
  Manager.create({
    title: "Product Example",
    photo: "/images/product.jpg",
    price: 50.99,
    stock: 10,
  })
);
Manager.create({
  title: "Product Example",
  photo: "/images/product.jpg",
  price: 50.99,
  stock: 10,
});
console.log(Manager.read());
