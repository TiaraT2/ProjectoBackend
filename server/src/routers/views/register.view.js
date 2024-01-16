import { Router } from "express";

const registerView = Router();

registerView.get("/register", (req, res) => {
  res.render("register");
});

export default registerView;
