import { Router } from "express";
const realView = Router();

realView.get("/products", async (req, res, next) => {
  try {
    return res.render("real");
  } catch (error) {
    next(error);
  }
});

export default realView;
