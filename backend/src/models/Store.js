import { Schema, model } from "mongoose";

let collection = "stores";
let schema = Schema(
  {
    name: { type: String, require: true },
    category: { type: String, require: true },
    location: { type: String, require: true },
    imagenURL: { type: String, require: false },
    headerImageId: { type: String, require: false },
    ownerId: { type: Schema.Types.ObjectId, ref: "users", require: true },
  },
  { timestamps: true }
);

let Store = model(collection, schema);

export default Store;
