import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';

// Migration endpoint to update old placeholder URLs to ui-avatars
export async function POST() {
  try {
    await dbConnect();
    
    // Find all reviews with via.placeholder.com URLs
    const reviews = await Review.find({
      clientPhoto: { $regex: 'via.placeholder.com' }
    });
    
    let updatedCount = 0;
    
    for (const review of reviews) {
      // Generate new ui-avatars URL
      const newPhoto = `https://ui-avatars.com/api/?name=${review.clientName.replace(' ', '+')}&background=7C4DFF&color=fff&size=48`;
      
      await Review.findByIdAndUpdate(review._id, {
        clientPhoto: newPhoto
      });
      
      updatedCount++;
    }
    
    return NextResponse.json({
      message: `Successfully migrated ${updatedCount} reviews to ui-avatars.com`,
      updatedCount
    });
  } catch (error) {
    console.error('Error migrating reviews:', error);
    return NextResponse.json(
      { error: 'Failed to migrate reviews' },
      { status: 500 }
    );
  }
}
