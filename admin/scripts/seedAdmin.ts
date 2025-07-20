import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') }); // ✅

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

async function seedAdmin() {
  await mongoose.connect(process.env.MONGODB_URI!);

  const existing = await User.findOne({ email: 'admin@example.com' });
  if (existing) {
    console.log('Admin already exists');
    return process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await User.create({
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
  });

  console.log('✅ Admin inserted with password: admin123');
  process.exit(0);
}

seedAdmin();
