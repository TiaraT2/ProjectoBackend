import { Router } from "express";
import ManagerProduct from "../../data/fs/products.fs.js";
const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await ManagerProduct.createProduct(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await ManagerProduct.read();
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await ManagerProduct.readOne(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
productsRouter.put("/sell/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const { quantity } = req.body;

    const response = await ManagerProduct.sellProduct(quantity, pid);

    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await ManagerProduct.destroy(pid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
export default productsRouter;
