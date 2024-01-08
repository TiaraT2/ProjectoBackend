class OrdersManager {
  #orders = [];

  create(data) {
    try {
      const { uid, pid, quantity, state } = data;
      const order = {
        id: crypto.randomBytes(12).toString("hex"),
        uid,
        pid,
        quantity,
        state,
      };

      this.#orders.push(order);
      return { statusCode: 200, response: order };
    } catch (error) {
      return { statusCode: 500, response: "Error al crear la orden." };
    }
  }

  read() {
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

  readOne(uid) {
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

  update(oid, quantity, state) {
    try {
      const orderIndex = this.#orders.findIndex((order) => order.id === oid);
      if (orderIndex !== -1) {
        this.#orders[orderIndex].quantity =
          quantity || this.#orders[orderIndex].quantity;
        this.#orders[orderIndex].state =
          state || this.#orders[orderIndex].state;
        return { statusCode: 200, response: this.#orders[orderIndex] };
      } else {
        return { statusCode: 404, response: "Orden no encontrada." };
      }
    } catch (error) {
      return { statusCode: 500, response: "Error al actualizar la orden." };
    }
  }

  destroy(oid) {
    try {
      const newOrders = this.#orders.filter((order) => order.id !== oid);
      if (newOrders.length < this.#orders.length) {
        this.#orders = newOrders;
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
