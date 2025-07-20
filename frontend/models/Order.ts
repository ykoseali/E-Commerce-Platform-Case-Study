import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    name: String,
    email: String,
    address: String,
    city: String,
    postalCode: String,
    items: [
      {
        _id: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    total: Number,
    status: { type: String, default: "pending" }, // can be: pending, confirmed, shipped
  },
  { timestamps: true }
);

export default models.Order || model("Order", OrderSchema);
