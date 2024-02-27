import { verifytoken } from "../utils/token.utils.js";

export default (req, res, next) => {
  try {
    const data = verifytoken(req.headers);
    const { role } = data;
    if (role !== "0") {
      const error = new Error("Only admin can access");
      error.statusCode = 403;
      throw error;
    } else {
      return next();
    }
  } catch (error) {
    return next(error);
  }
};
