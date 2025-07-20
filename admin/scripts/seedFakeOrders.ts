import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import  connectDB  from '../lib/mongodb';
import { User } from '../models/User';
console.log('🧪 User collection name:', User.collection.name);

import { Product } from '../models/Product';
import { Order } from '../models/Order';

async function seed() {
  await connectDB();

  console.log('✅ MONGODB_URI:', process.env.MONGODB_URI);

  const dbs = await mongoose.connection.db.admin().listDatabases();
  console.log('🔍 Available Databases:', dbs);

  const users = await User.find();
  console.log('🔍 Users in DB:', users);

  const admin = await User.findOne({ email: 'admin@example.com' });
  if (!admin) {
    console.error('❌ No admin user found');
    return;
  }

  const products = await Product.insertMany([
    { title: 'Apple', description: 'Fresh apple', price: 1.5, stock: 100 },
    { title: 'Banana', description: 'Yellow banana', price: 1.0, stock: 120 },
    { title: 'Orange', description: 'Citrus fruit', price: 1.2, stock: 80 },
    { title: 'Milk', description: '1L full-fat milk', price: 2.0, stock: 50 },
    { title: 'Bread', description: 'Whole wheat bread', price: 1.8, stock: 40 },
  ]);
  console.log(`✅ Inserted ${products.length} products`);

  const orders = [];
  for (let i = 0; i < 5; i++) {
    const items = [
      {
        product: products[i % products.length]._id,
        quantity: Math.floor(Math.random() * 3) + 1,
      },
    ];
    const totalAmount = items.reduce((sum, item) => {
      const p = products.find((p) => p._id.equals(item.product));
      return sum + (p?.price || 0) * item.quantity;
    }, 0);

    orders.push({
      user: admin._id,
      items,
      totalAmount,
      status: ['pending', 'shipped', 'delivered'][i % 3],
    });
  }

  await Order.insertMany(orders);
  console.log(`✅ Inserted ${orders.length} orders`);
  mongoose.disconnect();
}

seed();
