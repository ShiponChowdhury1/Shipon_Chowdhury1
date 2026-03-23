'use client';

import { useState, useEffect } from 'react';
import { Star, Plus, Trash2, CheckCircle, Edit2 } from 'lucide-react';
import Image from 'next/image';
import AdminSidebar from '../../../components/AdminSidebar';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import { Review } from '../../../../types';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; reviewId: string | null; reviewName: string }>({
    isOpen: false,
    reviewId: null,
    reviewName: ''
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    clientPhoto: '',
    rating: 5,
    reviewText: '',
  });

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
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingReview) {
        // Update existing review
        const response = await fetch(`/api/reviews?id=${editingReview.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const updatedReview = await response.json();
          setReviews(reviews.map(r => r.id === editingReview.id ? updatedReview : r));
          setFormData({ clientName: '', company: '', clientPhoto: '', rating: 5, reviewText: '' });
          setShowForm(false);
          setEditingReview(null);
        } else {
          alert('Failed to update review. Please try again.');
        }
      } else {
        // Create new review
        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const newReview = await response.json();
          setReviews([newReview, ...reviews]);
          setFormData({ clientName: '', company: '', clientPhoto: '', rating: 5, reviewText: '' });
          setShowForm(false);
        } else {
          alert('Failed to add review. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error saving review:', error);
      alert('Failed to save review. Please try again.');
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      clientName: review.clientName,
      company: review.company || '',
      clientPhoto: review.clientPhoto,
      rating: review.rating,
      reviewText: review.reviewText,
    });
    setShowForm(true);
  };

  const openDeleteModal = (reviewId: string, reviewName: string) => {
    setDeleteModal({ isOpen: true, reviewId, reviewName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, reviewId: null, reviewName: '' });
  };

  const handleDelete = async () => {
    if (!deleteModal.reviewId) return;
    
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/reviews?id=${deleteModal.reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReviews(reviews.filter(review => review.id !== deleteModal.reviewId));
        closeDeleteModal();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert('Failed to delete review. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default'); // You'll need to set this in Cloudinary
      
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dau8sazoh/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          clientPhoto: data.secure_url
        }));
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-[#0D101D]">
        <AdminSidebar />
        <div className="flex-1 ml-0 md:ml-[calc(8%+280px)] md:mr-[8%]">
          <div className="p-4 md:p-8 mt-16 md:mt-0">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0D101D]">
      <AdminSidebar />
      
      <div className="flex-1 ml-0 md:ml-[calc(8%+280px)] md:mr-[8%] w-full">
        <div className="p-4 md:p-8 mt-16 md:mt-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-heading">Reviews Management</h1>
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
            <div className="bg-white dark:bg-[#15192D] rounded-lg border border-gray-200 dark:border-[#2D3554] p-4 md:p-8 mb-6 md:mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 font-heading">
                {editingReview ? 'Edit Review' : 'Add New Review'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                      Company / Country *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent font-body"
                      placeholder="USA, UK, Colombia, etc."
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
                    Client Photo *
                  </label>
                  <div className="space-y-4">
                    {/* File Upload */}
                    <div className="flex items-center gap-4">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] hover:bg-gray-100 dark:hover:bg-[#1A1F35] transition-colors">
                          <span className="text-gray-600 dark:text-gray-400 font-body">
                            {uploading ? 'Uploading...' : 'Click to upload image'}
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* OR Divider */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-gray-300 dark:bg-[#2D3554]"></div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-body">OR</span>
                      <div className="flex-1 h-px bg-gray-300 dark:bg-[#2D3554]"></div>
                    </div>

                    {/* URL Input */}
                    <input
                      type="url"
                      name="clientPhoto"
                      value={formData.clientPhoto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent font-body"
                      placeholder="Or paste image URL"
                    />

                    {/* Preview */}
                    {formData.clientPhoto && (
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <Image
                          src={formData.clientPhoto}
                          alt="Preview"
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <span className="text-sm text-green-700 dark:text-green-400 font-body">Image uploaded successfully!</span>
                      </div>
                    )}
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
                    className="px-6 py-3 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/90 transition-colors font-medium font-body"
                  >
                    {editingReview ? 'Update Review' : 'Add Review'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingReview(null);
                      setFormData({ clientName: '', company: '', clientPhoto: '', rating: 5, reviewText: '' });
                    }}
                    className="px-6 py-3 border border-gray-300 dark:border-[#2D3554] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1A1F35] transition-colors font-medium font-body"
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
            <div className="divide-y divide-gray-200 dark:divide-[#2D3554]">
              {reviews.map((review) => (
                <div key={review.id} className="p-6 hover:bg-gray-50 dark:hover:bg-[#1A1F35] transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <Image
                        src={review.clientPhoto}
                        alt={review.clientName}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full"
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit review"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(review.id, review.clientName)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete review"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Delete Review"
        message={`Are you sure you want to delete the review from ${deleteModal.reviewName}? This action cannot be undone.`}
        isLoading={isDeleting}
      />

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up z-50">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Review deleted successfully!</span>
        </div>
      )}
    </div>
  );
}
