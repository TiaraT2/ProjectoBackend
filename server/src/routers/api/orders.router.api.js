import { Router } from "express";
import ManagerOrders from "../../data/fs/orders.fs.js";
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

ordersRouter.put("/:oid", async (req, res) => {
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

export default ordersRouter;
