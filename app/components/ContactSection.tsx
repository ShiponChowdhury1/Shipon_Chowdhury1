'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
export default function ContactSection() {

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@rahikahsan.com', label: 'Email' },
  ];

  useEffect(() => {
    // Initialize EmailJS
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      try {
        emailjs.init(publicKey);
        console.log('EmailJS initialized successfully');
      } catch (error) {
        console.error('EmailJS initialization failed:', error);
      }
    } else {
      console.warn('EmailJS public key not found in environment variables');
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      console.log('EmailJS Config:', { serviceId, templateId, publicKey: publicKey ? '***' : null });

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing');
      }

      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare template parameters - using common EmailJS variable names
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Rahik Ahsan',
        reply_to: formData.email, // Common EmailJS variable
        user_name: formData.name, // Alternative variable name
        user_email: formData.email, // Alternative variable name
      };

      console.log('Sending email with params:', { ...templateParams, message: templateParams.message.substring(0, 50) + '...' });

      // Send email using EmailJS
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('EmailJS send result:', result);

      // Success - Show toast notification
      toast.success('Thanks for your message! I\'ll get back to you soon.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear form
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error('Email sending failed:', error);

      // More detailed error logging
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error name:', error.name);
      }

      // Check if it's a network error or EmailJS specific error
      let errorMessage = 'Failed to send message. Please try again or contact directly.';
      if (error && typeof error === 'object' && 'text' in error) {
        errorMessage = `EmailJS Error: ${error.text}`;
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className=" px-4 sm:px-6 lg:px-8  dark:bg-[#0D101D]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="lg:my-16 my-8"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-xl md:text-5xl font-bold text-foreground mb-4 font-heading text-center lg:text-left">
            Let&apos;s Work Together!
          </h2>
        
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="lg:text-2xl text-base font-semibold text-gray-900 dark:text-white font-heading">Contact Information</h3>
            <p className='text-[#201d1d] dark:text-[#B2B2B2]'>Reach out through any of these channels. I typically <br /> respond within 24 hours.</p>

            {/* Email */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gray-200 dark:bg-white/10">
                  <Mail className="w-6 h-6 text-gray-700 dark:text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white font-heading">Email</h4>
                <a
                  href="mailto:oxshipon1@gmail.com"
                  className="text-[#7C4DFF] hover:text-[#7C4DFF]/80 transition-colors font-body"
                >
                 oxshipon1@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gray-200 dark:bg-white/10">
                  <Phone className="w-6 h-6 text-gray-700 dark:text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white font-heading">Phone</h4>
                <a
                  href="tel:+8801234567890"
                  className="text-[#7C4DFF] hover:text-[#7C4DFF]/80 transition-colors font-body"
                >
                 +8801889243696
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gray-200 dark:bg-white/10">
                  <MapPin className="w-6 h-6 text-gray-700 dark:text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white font-heading">Location</h4>
                <p className="text-gray-600 dark:text-gray-300 font-body">Dhaka, Bangladesh</p>
              </div>
            </div>
           
           <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4 font-heading">Follow</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-gray-200 dark:bg-neutral-800 rounded-lg hover:bg-[#7C4DFF] dark:hover:bg-[#7C4DFF] transition-all border border-gray-300 dark:border-[#2D3554]"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-700 dark:text-white group-hover:text-white dark:group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
         
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="bg-white dark:bg-[#15192D] backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-2 font-body">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#15192D] border border-gray-300 dark:border-[#2D3554] rounded-lg text-gray-900 dark:text-gray-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
                  placeholder="Shipon Chowdhury"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2 font-body">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#15192D] border border-gray-300 dark:border-[#2D3554] rounded-lg text-gray-900 dark:text-gray-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
                  placeholder="oxshipon1@gmail.com"
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white mb-2 font-body">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#15192D] border border-gray-300 dark:border-[#2D3554] rounded-lg text-gray-900 dark:text-gray-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/80 transition-all duration-300 font-medium group disabled:opacity-50 disabled:cursor-not-allowed font-body"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
}
