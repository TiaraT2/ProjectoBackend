import { Router } from "express";
import { ManagerProduct, ManagerUser } from "../../data/mongo/manager.mongo.js";
import sessionsRouter from "./register.view.js";
import formView from "./form.view.js";
import ordersRouter from "./orders.view.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const all = await ManagerProduct.read({});
    return res.render("index", {
      ManagerProduct: all.docs,
      title: "INDEX",
      ManagerUser: req.user,
    });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/sessions", sessionsRouter);
viewsRouter.use("/products", formView);
viewsRouter.use("/orders", ordersRouter);

export default viewsRouter;
