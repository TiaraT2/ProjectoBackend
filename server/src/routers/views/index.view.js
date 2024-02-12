import { Router } from "express";
import { ManagerProduct } from "../../data/mongo/manager.mongo.js";

const viewsRouter = Router();

const renderPage = async (req, res, next, view) => {
  try {
    const all = await ManagerProduct.read({});
    return res.render(view, { ManagerProduct: all });
  } catch (error) {
    next(error);
  }
};

viewsRouter.get("/", async (req, res, next) => {
  await renderPage(req, res, next, "index");
});

viewsRouter.get("/real", async (req, res, next) => {
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

    const readProducts = await ManagerProduct.read({ filter, sortAndPaginate });
    const products = readProducts.docs.map((doc) => doc.toObject());

    return res.render("real", { products });
  } catch (error) {
    next(error);
  }
});

const renderStaticPage = (res, page) => {
  return res.render(page, {});
};

viewsRouter.get("/form", (req, res, next) => {
  renderStaticPage(res, "form");
});

viewsRouter.get("/register", (req, res, next) => {
  renderStaticPage(res, "register");
});

export default viewsRouter;
