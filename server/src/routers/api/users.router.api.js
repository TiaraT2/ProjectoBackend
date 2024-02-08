import { Router } from "express";
// import ManagerUser from "../../data/fs/users.fs.js";
import { ManagerUser } from "../../data/mongo/manager.mongo.js";
const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await ManagerUser.create(data);
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
    const sortAndPaginate = {
      sort: { email: 1 },
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };

    const filter = {};
    if (req.query.name) {
      filter.name = req.query.name;
    }

    if (req.query.email === "desc") {
      sortAndPaginate.sort.email = -1;
    }

    const users = await ManagerUser.read({ filter, sortAndPaginate });
    if (users) {
      return res.json({
        statusCode: 200,
        response: users,
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

usersRouter.get("/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const filter = { email: email };
    const all = await ManagerUser.readByEmail(filter);
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
    return res.status(200).json({ statusCode: 200, response: one });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await ManagerUser.update(uid, req.body);
    return res.status(200).json({ statusCode: 200, response });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await ManagerUser.destroy(uid);
    return res.status(200).json({ statusCode: 200, response });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
