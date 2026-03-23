import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
import dbConnect from '../lib/mongodb';
import { User } from '../lib/models';
import { usersData } from '../data/admin_password';

async function seedUsers() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await dbConnect();
    console.log('✅ Connected to MongoDB');

    // Clear existing users
    console.log('🧹 Clearing existing users...');
    await User.deleteMany({});
    console.log('✅ Cleared existing users');

    // Seed users
    console.log('👥 Seeding users...');
    await User.insertMany(usersData);
    console.log(`✅ Seeded ${usersData.length} users`);

    console.log('🎉 Database seeded successfully with users!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers();
