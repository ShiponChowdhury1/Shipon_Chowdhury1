import dotenv from 'dotenv';
import path from 'path';
// Load .env.local at the very beginning
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
import dbConnect from '../lib/mongodb';
import { Project, Review, User } from '../lib/models';
import { projects } from '../data/projects';
import { reviews } from '../data/reviews';
import { usersData } from '@/data/admin_password';

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await dbConnect();
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Project.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});
    console.log('✅ Cleared existing data');

    // Seed projects
    console.log('📝 Seeding projects...');
    const projectsData = projects.map(project => ({
      ...project,
      _id: undefined // Let MongoDB generate the ID
    }));
    await Project.insertMany(projectsData);
    console.log(`✅ Seeded ${projects.length} projects`);

    // Seed reviews
    console.log('📝 Seeding reviews...');
    const reviewsData = reviews.map(review => ({
      clientName: review.clientName,
      clientPhoto: review.clientPhoto,
      rating: review.rating,
      reviewText: review.reviewText,
      company: review.company
    }));
    await Review.insertMany(reviewsData);
    console.log(`✅ Seeded ${reviews.length} reviews`);

    // Seed users
    console.log('👥 Seeding users...');
 
    await User.insertMany(usersData);
    console.log(`✅ Seeded ${usersData.length} users`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n📋 Admin Login Credentials:');
    console.log('1. ahikahsan@gmail.com / Rahik@12345 (Admin)');
    console.log('2. admin@example.com / Admin@123 (Admin)');
    console.log('3. manager@example.com / Manager@123 (Manager)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();