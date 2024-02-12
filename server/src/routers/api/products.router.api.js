//import ManagerProduct from "../../data/fs/products.fs.js";
import { Router } from "express";
import { ManagerProduct } from "../../data/mongo/manager.mongo.js";

const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await ManagerProduct.create(data);
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
    const products = await ManagerProduct.read({});
    if (products) {
      return res.json({
        statusCode: 200,
        response: products,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: "Not found!",
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const sortAndPaginate = {
      sort: { price: 1 },
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };

    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }

    if (req.query.price === "desc") {
      sortAndPaginate.sort.price = -1;
    }

    const products = await ManagerProduct.read({ filter, sortAndPaginate });
    if (products.length > 0) {
      return res.json({
        statusCode: 200,
        response: products,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: "Not found!",
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const product = await ManagerProduct.update(pid, data);
    if (product) {
      return res.json({
        statusCode: 200,
        response: product,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: "Not found!",
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await ManagerProduct.destroy(pid);
    if (product) {
      return res.json({
        statusCode: 200,
        response: product,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: "Not found!",
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
