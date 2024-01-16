import crypto from "crypto";
import fs from "fs";

class OrdersManager {
  #orders = [];
  #path = "./src/data/fs/files/orders.json";
  #conf = "utf-8";

  init() {
    try {
      const exists = fs.existsSync(this.#path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.#path, data);
      } else {
        this.#orders = JSON.parse(fs.readFileSync(this.#path, this.#conf));
      }
    } catch (error) {
      throw error;
    }
  }

  constructor() {
    this.init();
  }

  async saveOrdersToFile() {
    try {
      const jsonData = JSON.stringify(this.#orders, null, 2);
      await fs.promises.writeFile(this.#path, jsonData);
    } catch (error) {
      console.error("Error saving orders to file:", error.message);
    }
  }

  async checkFileExists() {
    try {
      await fs.promises.access(this.#path);
      return true;
    } catch (error) {
      return false;
    }
  }

  async create(data) {
    try {
      let { uid, pid, quantity, state } = data;

      // Si no se proporcionan IDs de usuario y producto, obtener IDs válidos
      if (!uid || !pid) {
        // Obtener IDs de usuario y producto de tus managers respectivos
        const validUser = await ManagerUser.getRandomUserId();
        const validProduct = await ManagerProduct.getRandomProductId();

        // Si no se proporcionó el ID de usuario, usar uno válido obtenido
        uid = uid || validUser.id;

        // Si no se proporcionó el ID de producto, usar uno válido obtenido
        pid = pid || validProduct.id;
      }

      const order = {
        id: crypto.randomBytes(12).toString("hex"),
        uid,
        pid,
        quantity,
        state,
      };

      this.#orders.push(order);
      await this.saveOrdersToFile();
      return { statusCode: 200, response: order.id };
    } catch (error) {
      return { statusCode: 500, response: "Error al crear la orden." };
    }
  }

  async read() {
    try {
      if (this.#orders.length === 0) {
        throw new Error("No orders found!");
      } else {
        return { statusCode: 200, response: this.#orders };
      }
    } catch (error) {
      return { statusCode: 500, response: error.message };
    }
  }

  async readOne(uid) {
    try {
      const userOrders = this.#orders.filter((order) => order.uid === uid);
      return { statusCode: 200, response: userOrders };
    } catch (error) {
      return {
        statusCode: 500,
        response: "Error al obtener las órdenes del usuario.",
      };
    }
  }

  async update(oid, quantity, state) {
    try {
      const orderIndex = this.#orders.findIndex((order) => order.id === oid);
      if (orderIndex !== -1) {
        this.#orders[orderIndex].quantity =
          quantity || this.#orders[orderIndex].quantity;
        this.#orders[orderIndex].state =
          state || this.#orders[orderIndex].state;
        await this.saveOrdersToFile();
        return { statusCode: 200, response: this.#orders[orderIndex] };
      } else {
        return { statusCode: 404, response: "Orden no encontrada." };
      }
    } catch (error) {
      return { statusCode: 500, response: "Error al actualizar la orden." };
    }
  }

  async destroy(oid) {
    try {
      const newOrders = this.#orders.filter((order) => order.id !== oid);
      if (newOrders.length < this.#orders.length) {
        this.#orders = newOrders;
        await this.saveOrdersToFile();
        return { statusCode: 200, response: "Orden eliminada exitosamente." };
      } else {
        return { statusCode: 404, response: "Orden no encontrada." };
      }
    } catch (error) {
      return { statusCode: 500, response: "Error al eliminar la orden." };
    }
  }
}

const ManagerOrders = new OrdersManager();
export default ManagerOrders;
