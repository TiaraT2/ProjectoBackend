//import ManagerProduct from "../../data/fs/products.fs.js";
import { Router } from "express";
import { ManagerProduct } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

const productsRouter = Router();

productsRouter.post("/", isAdmin, async (req, res, next) => {
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
    const sortAndPaginate = {
      sort: { price: 1 },
      page: parseInt(req.query.page) || 1,
      limit: 20, // Mostrar 20 productos por página
    };

    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }

    if (req.query.price === "desc") {
      sortAndPaginate.sort.price = -1;
    }

    const products = await ManagerProduct.read({ filter, sortAndPaginate });
    const totalProducts = await ManagerProduct.count(filter);

    if (products.length > 0) {
      const pagination = {
        page: sortAndPaginate.page,
        pages: Array.from(
          { length: Math.ceil(totalProducts / sortAndPaginate.limit) },
          (_, i) => i + 1
        ),
      };

      return res.render("products", {
        response: {
          products,
          total: totalProducts,
          pagination,
        },
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
