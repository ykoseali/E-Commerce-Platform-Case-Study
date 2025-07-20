import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import User from '../models/User';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

console.log('✅ Loaded URI:', process.env.MONGODB_URI);

async function seedAdmin() {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is missing');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB connected');

  const email = 'admin@example.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ email });

  if (existing) {
    existing.password = hashedPassword;
    existing.firstName = 'Admin';
    existing.lastName = 'User';
    await existing.save();
    console.log('✅ Admin password updated to "admin123"');
  } else {
    await User.create({
      email,
      password: hashedPassword,
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
    });
    console.log('✅ Admin created with password "admin123"');
  }

  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
