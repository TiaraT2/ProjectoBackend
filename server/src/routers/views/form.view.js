import { Router } from "express";

const formView = Router();

formView.get("/form", async (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});

export default formView;
