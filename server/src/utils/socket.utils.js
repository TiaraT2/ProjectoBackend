import { socketServer } from "../../server.js";
import ManagerProduct from "../data/fs/products.fs.js";
import propsProductUtils from "./propsProducts.utils.js";

export default (socket) => {
  console.log("client " + socket.id + " connected");

  socket.emit("products", ManagerProduct.read());

  socket.on("new product", async (data) => {
    console.log(data);
    try {
      propsProductUtils(data);
      await ManagerProduct.create(data);
      socketServer.emit("products", ManagerProduct.read());
    } catch (error) {
      console.log(error);
    }
  });
};
