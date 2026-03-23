import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ContactSection from '@/app/components/ContactSection';

export const metadata = {
  title: 'Contact | Rahik Ahsan - UX/UI Designer',
  description: 'Get in touch with Rahik Ahsan, UX/UI Designer. Let\'s collaborate on your next design project.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24">
        <div className="text-center mb-8 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4 mt-8">
            Get In Touch
          </h1>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Let&apos;s discuss your project and how I can help you achieve your goals
          </p>
        </div>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
