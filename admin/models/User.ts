import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    firstName: String,
    lastName: String,
    phone: String,
    emailVerified: { type: Boolean, default: false },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    addresses: [
      {
        street: String,
        city: String,
        postalCode: String,
        country: String,
      },
    ],
  },
  { timestamps: true }
);

export const User = models.User || model('User', UserSchema);
