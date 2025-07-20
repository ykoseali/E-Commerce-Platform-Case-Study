import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

async function seedCustomers() {
  try {
    await connectDB();

    const existing = await User.find({ role: 'customer' });
    if (existing.length > 0) {
      console.log('Customers already seeded');
      return;
    }

    const customers = [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'customer',
        phone: '555-1234',
      },
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'customer',
        phone: '555-5678',
      },
    ];

    await User.insertMany(customers);
    console.log('✅ Customers seeded');
  } catch (err) {
    console.error('❌ Error seeding customers:', err);
  }
}

seedCustomers();
