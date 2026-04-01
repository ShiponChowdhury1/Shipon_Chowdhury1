import * as bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../lib/models';

dotenv.config({ path: '.env.local' });

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Admin credentials
    const adminEmail = 'oxshipon1@gmail.com';
    const adminPassword = 'Shipon7878';
    const adminName = 'Shipon Chowdhury';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin user already exists. Updating password...');
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      // Update admin
      await User.findByIdAndUpdate(existingAdmin._id, {
        password: hashedPassword,
        name: adminName,
        role: 'admin',
        isActive: true
      });
      
      console.log('✅ Admin password updated successfully!');
    } else {
      console.log('Creating new admin user...');
      
      // Hash password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      // Create admin user
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: 'admin',
        isActive: true
      });
      
      console.log('✅ Admin user created successfully!');
    }

    console.log('\n📧 Admin Email:', adminEmail);
    console.log('🔑 Admin Password:', adminPassword);
    console.log('\nYou can now login at: http://localhost:3000/admin/login\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
