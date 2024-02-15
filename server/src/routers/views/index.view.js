import { Router } from "express";
import { ManagerProduct } from "../../data/mongo/manager.mongo.js";
import sessionsRouter from "./register.view.js";
import formView from "./form.view.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const all = await ManagerProduct.read({});
    return res.render("index", { ManagerProduct: all.docs, title: "INDEX" });
  } catch (error) {
    next(error);
  }
});
viewsRouter.use("/auth", sessionsRouter);
viewsRouter.use("/products", formView);

export default viewsRouter;
