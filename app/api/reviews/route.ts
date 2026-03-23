import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';

// GET all reviews
export async function GET() {
  try {
    await dbConnect();
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    
    // Transform to match the expected format
    const formattedReviews = reviews.map((review) => ({
      id: review._id.toString(),
      clientName: review.clientName,
      clientPhoto: review.clientPhoto,
      rating: review.rating,
      reviewText: review.reviewText,
      company: review.company || '',
    }));
    
    return NextResponse.json(formattedReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST new review
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const { clientName, company, rating, reviewText, clientPhoto } = body;
    
    // Use provided clientPhoto or generate avatar URL
    const photoUrl = clientPhoto || `https://ui-avatars.com/api/?name=${clientName.replace(' ', '+')}&background=7C4DFF&color=fff&size=48`;
    
    const review = await Review.create({
      clientName,
      clientPhoto: photoUrl,
      company: company || '',
      rating: Number(rating),
      reviewText,
    });
    
    return NextResponse.json(
      {
        id: review._id.toString(),
        clientName: review.clientName,
        clientPhoto: review.clientPhoto,
        rating: review.rating,
        reviewText: review.reviewText,
        company: review.company || '',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

// PATCH update review
export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const { clientName, company, rating, reviewText, clientPhoto } = body;
    
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      {
        clientName,
        clientPhoto,
        company: company || '',
        rating: Number(rating),
        reviewText,
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedReview) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      id: updatedReview._id.toString(),
      clientName: updatedReview.clientName,
      clientPhoto: updatedReview.clientPhoto,
      rating: updatedReview.rating,
      reviewText: updatedReview.reviewText,
      company: updatedReview.company || '',
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE review
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }
    
    const deletedReview = await Review.findByIdAndDelete(id);
    
    if (!deletedReview) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
