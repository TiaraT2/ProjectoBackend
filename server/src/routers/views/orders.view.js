import { Router } from "express";
import {
  ManagerOrders,
  ManagerProduct,
  ManagerUser,
} from "../../data/mongo/manager.mongo.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

const ordersRouter = Router();

ordersRouter.get("/", passCallBack("jwt"), async (req, res, next) => {
  try {
    const sortAndPaginate = {
      sort: { price: 1 },
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    const user = await ManagerUser.readByEmail(req.user.email);
    const filter = {
      uid: user._id,
    };
    const all = await ManagerOrders.read({ filter, sortAndPaginate });
    let orders = all.docs.map((doc) => doc.toObject());

    return res.render("orders", {
      orders: orders,
      next: all.nextPage,
      prev: all.prevPage,
    });
  } catch (error) {
    return res.render("orders", {
      message: "NO ORDERS YET!",
    });
  }
});

export default ordersRouter;
