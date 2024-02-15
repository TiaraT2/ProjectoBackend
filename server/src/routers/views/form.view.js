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
    const all = await ManagerProduct.read({});
    const products = all.docs.map(doc => doc.toObject());
    return res.render("real", { ManagerProduct: products, title: "REAL" });
  } catch (error) {
    next(error);
  }
});



export default formView;
