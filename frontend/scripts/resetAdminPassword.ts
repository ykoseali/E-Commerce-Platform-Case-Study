import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import  User  from '../models/User';

dotenv.config();

async function reset() {
  await mongoose.connect(process.env.MONGODB_URI!);

  const user = await User.findOne({ email: 'admin@example.com' });
  if (!user) {
    console.log('❌ Admin not found');
    return;
  }

  user.password = await bcrypt.hash('admin123', 10);
  await user.save();

  console.log('✅ Admin password reset to admin123');
  process.exit();
}

reset();
