import { Router } from "express";
import registerView from "./register.view.js";
import formView from "./form.view.js";
import realView from "./real.view.js";
import ManagerProduct from "../../data/fs/products.fs.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const all = await ManagerProduct.read();
    return res.render("index", { ManagerProduct: all });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/events", registerView);
viewsRouter.use("/events", formView);
viewsRouter.use("/events", realView);

export default viewsRouter;
