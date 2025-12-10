import { Schema, model } from "mongoose";

let collection = "users"
let schema = Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    role: {type: String, require: true},
    password: {type: String, require: true}
},{
    timestamps: true
})

let User = model(collection, schema)

export default User