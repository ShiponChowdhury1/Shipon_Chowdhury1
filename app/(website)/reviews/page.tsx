import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ReviewsSection from '@/app/components/ReviewsSection';

export const metadata = {
  title: 'Reviews | Rahik Ahsan - UX/UI Designer',
  description: 'Client testimonials and reviews for UX/UI design services',
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24">
        <div className="text-center mb-8 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4 mt-8">
            Client Testimonials
          </h1>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            What clients and collaborators have to say about working with me
          </p>
        </div>

        <ReviewsSection />
      </main>

      <Footer />
    </div>
  );
}
