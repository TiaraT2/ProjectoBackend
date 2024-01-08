import { Router } from "express";
import ManagerUser from "../../data/fs/users.fs.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await ManagerUser.createUser(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/", async (req, res, next) => {
  try {
    const all = await ManagerUser.read();
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await ManagerUser.readOne(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { newName } = req.body;

    const response = await ManagerUser.updateName(uid, newName);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await ManagerUser.destroy(uid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
