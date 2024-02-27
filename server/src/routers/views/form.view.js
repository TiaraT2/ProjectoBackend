import { Router } from "express";
import { ManagerProduct } from "../../data/mongo/manager.mongo.js";

const formView = Router();

formView.get("/form", async (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});
formView.get("/real", async (req, res, next) => {
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

    const all = await ManagerProduct.read({ filter, sortAndPaginate });
    const products = all.docs.map((doc) => doc.toObject());

    return res.render("real", {
      ManagerProduct: products,
      title: "REAL",
      pagination: {
        hasPrevPage: all.hasPrevPage,
        hasNextPage: all.hasNextPage,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
        pages: Array.from({ length: all.totalPages }, (_, i) => i + 1),
        page: all.page,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default formView;
