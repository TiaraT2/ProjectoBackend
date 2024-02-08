import { Router } from "express";
// import ManagerOrders from "../../data/fs/orders.fs.js";
import { ManagerOrders } from "../../data/mongo/manager.mongo.js";
const ordersRouter = Router();

ordersRouter.post("/", async (req, res, next) => {
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

ordersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await ManagerOrders.readOne(uid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const { quantity, state } = req.body;

    const result = await ManagerOrders.update(oid, quantity, state);

    res.status(result.statusCode).json(result.response);
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await ManagerOrders.destroy(oid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const filter = req.query; 
    const options = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
    };
    const response = await ManagerOrders.read({ filter, options });
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/total/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const total = await ManagerOrders.report(uid);
    return res.json({
      statusCode: 200,
      total,
    });
  } catch (error) {
    return next(error);
  }
});


export default ordersRouter;
