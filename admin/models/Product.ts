import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, // ✅ Add this line
    stock: Number,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = models.Product || model('Product', ProductSchema);
