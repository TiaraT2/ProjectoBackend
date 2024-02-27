import { Router } from "express";
import { ManagerUser } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  has8char,
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 401,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in!",
        });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

sessionsRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with google!",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post("/signout", passCallBack("jwt"), async (req, res, next) => {
  try {
    return res.clearCookie("token").json({
      statusCode: 200,
      message: "Signed out!",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/", passCallBack("jwt"), async (req, res, next) => {
  try {
    const user = {
      email: req.user.email,
      role: req.user.role,
      photo: req.user.photo,
    };
    return res.json({
      statusCode: 200,
      response: user,
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/signout/cb", (req, res, next) => {
  try {
    return res.json({
      statusCode: 400,
      message: "Already done",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
