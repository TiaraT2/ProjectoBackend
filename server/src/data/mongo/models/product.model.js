import { model, Schema} from "mongoose";
import moongosePaginate from "mongoose-paginate-v2";

let collection = "products";

const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: {
      type: String,
      default: "https://i.postimg.cc/DwRH27HY/imagen-2024-02-08-065206989.png",
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

schema.plugin(moongosePaginate);
const Product = model(collection, schema);
export default Product;
