import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Order from "./models/order.model.js";
import { Types } from "mongoose";

class MongoManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }

  async read({ filter, options }) {
    try {
      const all = await this.model.paginate(filter, options);
      if (all.totalDocs === 0) {
        const error = new Error("there aren't elements");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id).lean();
      if (!one) {
        const error = new Error("there aren't elements");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const options = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, options);
      if (!one) {
        const error = new Error("There isn't elements");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      if (!one) {
        const error = new Error("There isn't elements");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  async report(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { uid: new Types.ObjectId(uid) } },

        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "pid",
            as: "product_id",
          },
        },

        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
            },
          },
        },

        { $set: { subTotal: { $multiply: ["$quantity", "$price"] } } },

        { $group: { _id: "$uid", total: { $sum: "$subTotal" } } },

        {
          $project: { _id: 0, uid: "$_id", total: "$total", date: new Date() },
        },
      ]);

      return report;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(filter) {
    try {
      const one = await this.model.find(filter);
      if (!one) {
        const error = new Error("there isn't elements");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const ManagerUser = new MongoManager(User);
const ManagerProduct = new MongoManager(Product);
const ManagerOrders = new MongoManager(Order);
export { ManagerOrders, ManagerProduct, ManagerUser };
