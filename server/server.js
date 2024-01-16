import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorhandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import ManagerProduct from "./src/data/fs/products.fs.js";
import __dirname from "./utils.js";

const server = express();

const PORT = 8080;
const ready = console.log("server ready on " + PORT);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("products", ManagerProduct.read());
  socket.on("newProduct", async (data) => {
    try {
      await ManagerProduct.createProduct(data);
      socketServer.emit("product", ManagerProduct.read());
    } catch (error) {
      console.log(error);
    }
  });
});

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
