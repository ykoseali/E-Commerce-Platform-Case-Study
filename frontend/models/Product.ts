import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    images: [{ type: String }], // URLs from Cloudinary
    tags: [{ type: String }],
    specs: { type: Map, of: String }, // dynamic product specs

    featured: { type: Boolean, default: false },

    variants: [
      {
        size: String,
        color: String,
        stock: Number,
      },
    ],
  },
  { timestamps: true }
);

export default models.Product || model("Product", ProductSchema);
