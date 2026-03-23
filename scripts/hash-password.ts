import bcrypt from 'bcryptjs';

async function hashPassword() {
  const password = process.env.ADMIN_PASSWORD || 'Rahik@12345';
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('Original Password:', password);
  console.log('Hashed Password:', hashedPassword);
  console.log('\nUpdate your .env.local file:');
  console.log(`ADMIN_PASSWORD=${hashedPassword}`);
}

hashPassword();