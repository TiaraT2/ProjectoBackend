import { Router } from "express";
import productsRouter from "./products.router.api.js";
import usersRouter from "./users.router.api.js";
import ordersRouter from "./orders.router.api.js";
import sessionsRouter from "./session.router.api.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", passCallBackMid("jwt"), ordersRouter);
apiRouter.use("/sessions", sessionsRouter);

export default apiRouter;
