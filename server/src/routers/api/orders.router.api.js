import { Router } from "express";
import propsOrder from "../../middlewares/propsOrders.js";
import { ManagerOrders } from "../../data/mongo/manager.mongo.js";

const ordersRouter = Router();

ordersRouter.post("/", propsOrder, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await ManagerOrders.create(data);

    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const sortAndPaginate = {
      sort: { state: 1 },
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 20,
    };

    const filter = {};
    if (req.query.uid) {
      filter.uid = req.query.uid;
    }

    if (req.query.state === "desc") {
      sortAndPaginate.sort.state = -1;
    }

    const orders = await ManagerOrders.read({ filter, sortAndPaginate });
    if (orders) {
      return res.json({
        statusCode: 200,
        response: orders,
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

ordersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const order = await ManagerOrders.readOne(uid);
    if (order) {
      return res.json({
        statusCode: 200,
        response: order,
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

ordersRouter.get("/total/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const report = await ManagerOrders.report(uid);
    return res.json({
      statusCode: 200,
      response: report,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const order = await ManagerOrders.destroy(oid);
    if (order) {
      return res.json({
        statusCode: 200,
        response: order,
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

ordersRouter.put("/:oid/:quantity/:state", async (req, res, next) => {
  try {
    const { oid, quantity, state } = req.params;
    const order = await ManagerOrders.update(oid, quantity, state);
    if (order) {
      return res.json({
        statusCode: 200,
        response: order,
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

export default ordersRouter;
