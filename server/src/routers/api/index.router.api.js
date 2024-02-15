import { Router } from "express";
import productsRouter from "./products.router.api.js";
import usersRouter from "./users.router.api.js";
import ordersRouter from "./orders.router.api.js";
import sessionRouter from "./session.router.api.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/auth", sessionRouter);

export default apiRouter;
