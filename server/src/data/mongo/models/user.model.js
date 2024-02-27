import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    role: { type: Number, default: 0 },
    photo: {
      type: String,
      default: "https://i.postimg.cc/zBxfQyFm/imagen-2024-02-07-094348898.png",
    },
    password: { type: String, required: true },
    //age: { type: Number, default: 18 },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate)
const User = model(collection, schema);

export default User;
