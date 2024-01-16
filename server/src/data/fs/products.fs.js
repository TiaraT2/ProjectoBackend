import fs from "fs";
import crypto from "crypto";

class ProductManager {
  static #products = [];

  constructor() {
    this.path = "./src/data/fs/files/products.json";
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

  createProduct({ title, photo, price, stock }) {
    try {
      const newProduct = {
        id: crypto.randomBytes(12).toString("hex"),
        title,
        photo,
        price,
        stock,
      };

      ProductManager.#products.push(newProduct);

      fs.writeFileSync(
        this.path,
        JSON.stringify(ProductManager.#products, null, 2)
      );

      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("No products found!");
      } else {
        return ProductManager.#products;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const productId = String(id);
      const product = ProductManager.#products.find(
        (each) => each.id === productId
      );

      if (!product) {
        throw new Error("Product not found!");
      } else {
        return product;
      }
    } catch (error) {
      throw error;
    }
  }
  async sellProduct(quantity, pid) {
    try {
      const product = this.readOne(pid);

      if (product.stock >= quantity) {
        product.stock -= quantity;

        fs.writeFileSync(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );

        return product.stock;
      } else {
        const error = new Error("Insufficient stock");
        error.statusCode = 400;
        throw error;
      }
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
        throw new Error("Product not found!");
      }

      ProductManager.#products.splice(productIndex, 1);

      fs.writeFileSync(
        this.path,
        JSON.stringify(ProductManager.#products, null, 2)
      );

      return "Product deleted";
    } catch (error) {
      throw error;
    }
  }
}

const ManagerProduct = new ProductManager();
export default ManagerProduct;
