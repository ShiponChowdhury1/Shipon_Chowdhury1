
# Rahik Ahsan - UX/UI Designer Portfolio

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or cloud instance)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your MongoDB connection string.

4. Start MongoDB locally (if using local MongoDB):
   ```bash
   # On Windows with MongoDB installed
   mongod

   # Or use MongoDB Compass/Atlas for cloud database
   ```

5. Seed the database with sample data:
   ```bash
   npm run seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

### Database Seeding

The project includes a seed script that populates the database with sample projects and reviews data.

**Available Commands:**
- `npm run seed` - Seeds the database with sample data

**Data Structure:**
- Projects are stored in the `projects` collection
- Reviews are stored in the `reviews` collection

### Backend Technology

Backend_Technology= npm install express mongoose cors dotenv morgan helmet cookie-parser bcrypt jsonwebtoken express-rate-limit zod express-async-handler multer cloudinary nodemailer

Backend_Technology_Type_Save = npm install -D typescript ts-node ts-node-dev @types/node @types/express @types/cors @types/cookie-parser @types/multer @types/jsonwebtoken @types/bcrypt

### Frontend Technology

# npm install next react react-dom
# npm install @reduxjs/toolkit react-redux redux-persist
# npm install @reduxjs/toolkit react-redux
# npm install react-toastify
# npm install cloudinary
# npm install lucide-react
# npm install framer-motion
# npm install react-hook-form zod @hookform/resolvers
# npx shadcn@latest init  



# Shipon_Chowdhury1
