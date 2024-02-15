import { Router } from "express";

const sessionsRouter = Router();

sessionsRouter.get("/register", (req, res) => {
  try {
    return res.render("register");
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/login", (req, res) => {
  try {
    return res.render("login");
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
