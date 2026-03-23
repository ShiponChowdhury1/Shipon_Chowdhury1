'use client';

import AdminSidebar from '@/app/components/AdminSidebar';
import { Plus, Edit, Trash2, CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';

export default function ReviewsManagerPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      clientName: 'Sarah Johnson',
      rating: 5,
      reviewText: 'Rahik delivered an exceptional website that exceeded expectations.',
      status: 'Approved',
      date: '2024-12-05',
    },
    {
      id: 2,
      clientName: 'Michael Chen',
      rating: 5,
      reviewText: 'Working with Rahik was a pleasure. He understood our vision perfectly.',
      status: 'Pending',
      date: '2024-12-02',
    },
    {
      id: 3,
      clientName: 'Emma Rodriguez',
      rating: 5,
      reviewText: 'Highly professional and responsive. Went above and beyond expectations.',
      status: 'Approved',
      date: '2024-11-28',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    rating: '5',
    reviewText: '',
    company: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding review:', formData);
    setFormData({
      clientName: '',
      rating: '5',
      reviewText: '',
      company: '',
    });
    setIsModalOpen(false);
  };

  const handleApprove = (id: number) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, status: 'Approved' } : r))
    );
  };

  const handleReject = (id: number) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const pendingCount = reviews.filter((r) => r.status === 'Pending').length;

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-2">Reviews</h1>
              <p className="text-neutral-600">Manage client reviews and testimonials</p>
              {pendingCount > 0 && (
                <p className="text-yellow-600 text-sm mt-2">
                  {pendingCount} review{pendingCount !== 1 ? 's' : ''} pending approval
                </p>
              )}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Review
            </button>
          </div>

          {/* Reviews Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Client Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Rating</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Review</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review.id} className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-neutral-900">{review.clientName}</td>
                      <td className="px-6 py-4">
                        <span className="text-yellow-500 font-semibold">{'★'.repeat(review.rating)}</span>
                      </td>
                      <td className="px-6 py-4 text-neutral-600 text-sm max-w-xs truncate">{review.reviewText}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1 ${
                            review.status === 'Approved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {review.status === 'Approved' ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Circle className="w-3 h-3" />
                          )}
                          {review.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-600 text-sm">{review.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {review.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(review.id)}
                                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(review.id)}
                                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setReviews(reviews.filter((r) => r.id !== review.id))}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Review Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
                <div className="sticky top-0 bg-white px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-neutral-900">Add New Review</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddReview} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Client Name</label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Client name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Company name (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Rating</label>
                    <select
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Review Text</label>
                    <textarea
                      name="reviewText"
                      value={formData.reviewText}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      placeholder="Write the review..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                      Add Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
