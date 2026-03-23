'use client';

import { useState, useEffect } from 'react';
import { Star, Plus, Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import AdminSidebar from '../../components/AdminSidebar';
import { Review } from '../../../types';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    rating: 5,
    reviewText: '',
    clientPhoto: '',
  });
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews from API
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'reviews_photos');

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dau8sazoh';
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formDataUpload,
        }
      );

      const data = await response.json();
      
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, clientPhoto: data.secure_url }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: formData.clientName,
          clientPhoto: formData.clientPhoto,
          rating: formData.rating,
          reviewText: formData.reviewText,
          company: formData.company,
        }),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews([newReview, ...reviews]);
        setFormData({ clientName: '', company: '', rating: 5, reviewText: '', clientPhoto: '' });
        setPreviewImage('');
        setShowForm(false);
      } else {
        alert('Failed to add review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to add review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`/api/reviews?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReviews(reviews.filter(review => review.id !== id));
      } else {
        alert('Failed to delete review. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0D101D]">
      <AdminSidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">Reviews Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 font-body">Manage client reviews and testimonials</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-3 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/90 transition-colors font-medium font-body"
            >
              <Plus className="w-5 h-5" />
              Add New Review
            </button>
          </div>

          {/* Add Review Form */}
          {showForm && (
            <div className="bg-white dark:bg-[#15192D] rounded-lg border border-gray-200 dark:border-[#2D3554] p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 font-heading">Add New Review</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Client Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 font-body">
                    Client Photo
                  </label>
                  <div className="flex items-center gap-4">
                    {previewImage || formData.clientPhoto ? (
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 dark:border-[#2D3554]">
                        <Image
                          src={previewImage || formData.clientPhoto}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-[#2D3554] flex items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                        id="clientPhoto"
                      />
                      <label
                        htmlFor="clientPhoto"
                        className={`inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-[#2D3554] rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1A1F35] transition-colors font-body ${
                          uploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <Upload className="w-4 h-4" />
                        {uploading ? 'Uploading...' : 'Upload Photo'}
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-body">
                        Optional. If not uploaded, an avatar will be auto-generated.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 font-body">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent font-body"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 font-body">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent font-body"
                      placeholder="Company Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 font-body">
                      Rating *
                    </label>
                    <select
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent font-body"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 font-body">
                    Review Text *
                  </label>
                  <textarea
                    name="reviewText"
                    value={formData.reviewText}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent resize-none font-body"
                    placeholder="Write the client's review here..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/90 transition-colors font-medium font-body disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Adding...' : 'Add Review'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    disabled={submitting}
                    className="px-6 py-3 border border-gray-300 dark:border-[#2D3554] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1A1F35] transition-colors font-medium font-body disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          <div className="bg-white dark:bg-[#15192D] rounded-lg border border-gray-200 dark:border-[#2D3554]">
            <div className="p-6 border-b border-gray-200 dark:border-[#2D3554]">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-heading">All Reviews ({reviews.length})</h2>
            </div>
            {loading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400 font-body">
                Loading reviews...
              </div>
            ) : reviews.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400 font-body">
                No reviews yet. Add your first review!
              </div>
            ) : (
            <div className="divide-y divide-gray-200 dark:divide-[#2D3554]">
              {reviews.map((review) => {
                const photoUrl = review.clientPhoto && review.clientPhoto.trim() !== '' 
                  ? review.clientPhoto 
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(review.clientName)}&background=7C4DFF&color=fff&size=128`;
                
                return (
                <div key={review.id} className="p-6 hover:bg-gray-50 dark:hover:bg-[#1A1F35] transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <Image
                        src={photoUrl}
                        alt={review.clientName}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full"
                        unoptimized
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white font-body">{review.clientName}</h3>
                          {review.company && (
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-body">• {review.company}</span>
                          )}
                        </div>
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 font-body">{review.reviewText}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete review"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )})}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
