import { Schema, model } from "mongoose";

let colleccion = "products";
let schema = Schema(
  {
    storeId: { type: Schema.Types.ObjectId, ref: "stores", require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    imageId: { type: String, require: true },
    stock: { type: Number, require: true },
  },
  { timestamps: true }
);

let Product = model(colleccion, schema);

export default Product;
