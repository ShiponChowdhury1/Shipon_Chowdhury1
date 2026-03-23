'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Review } from '../../types';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

/* =========================
   Review Card
========================= */
function ReviewCard({
  clientName,
  clientPhoto,
  rating,
  reviewText,
  company,
}: Review) {
  const photoUrl =
    clientPhoto && clientPhoto.trim() !== ''
      ? clientPhoto
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          clientName
        )}&background=7C4DFF&color=fff&size=128`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="
        relative
        bg-gradient-to-br from-white to-gray-50 dark:from-[#15192D] dark:to-[#1A1F3A]
        border-2 border-gray-100 dark:border-[#2D3554]
        rounded-xl
        p-5 md:p-6
        shadow-lg hover:shadow-2xl
     
        transition-all duration-300
        flex flex-col
        h-[300px] sm:h-80 md:h-[390px]
        overflow-hidden
      "
    >
      {/* Tooltip Badge - Top Left Corner */}
      <div className="absolute top-0 left-0 group">
        <div className="
          bg-gradient-to-r from-purple-500 to-purple-600
          text-white
          text-xs font-semibold
          px-3 py-1.5
          rounded-br-lg rounded-tl-xl
          shadow-md
          flex items-center gap-1
          cursor-pointer
          hover:from-purple-600 hover:to-purple-700
          transition-all duration-300
        ">
          <Star className="w-3 h-3 fill-white" />
          <span>Verified Review</span>
        </div>
        
        {/* Tooltip on Hover */}
        <div className="
          absolute top-full left-0 mt-2
          bg-gray-900 dark:bg-gray-800
          text-white text-xs
          px-3 py-2
          rounded-lg
          shadow-xl
          opacity-0 group-hover:opacity-100
          pointer-events-none
          transition-opacity duration-200
          whitespace-nowrap
          z-10
        ">
          Authentic client feedback ✨
          <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45"></div>
        </div>
      </div>

      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-100/50 to-transparent dark:from-purple-900/20 rounded-bl-full"></div>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6 relative z-10 mt-8">
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 ring-4 ring-purple-100 dark:ring-purple-900/30">
          <Image
            src={photoUrl}
            alt={clientName}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="flex-1">
          <p className="font-bold text-card-foreground text-base md:text-lg mb-1">
            {clientName}
          </p>

          {company && (
            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">
              {company}
            </p>
          )}

          {/* Rating */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-all duration-200 ${
                  i < rating
                    ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review Text */}
      <p
        className="
          text-card-foreground
          leading-relaxed
          text-sm md:text-base
          line-clamp-5 md:line-clamp-6
          flex-1
          overflow-hidden
          relative z-10
          italic
        "
      >
        &ldquo;{reviewText}&rdquo;
      </p>
    </motion.div>
  );
}

/* =========================
   Reviews Section
========================= */
export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section
      id="reviews"
      className="py-8 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-xl md:text-5xl font-bold text-foreground mb-4 font-heading text-center lg:text-left">
            Client Reviews
          </h2>
        </motion.div>

        {/* Swiper Slider */}
        <div className="reviews-swiper">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={reviews.length > 3}
            speed={500}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="pb-12"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard {...review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .reviews-swiper .swiper-pagination-bullet {
          background: #7C4DFF;
          opacity: 0.5;
        }
        .reviews-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #7C4DFF;
        }
        .dark .reviews-swiper .swiper-pagination-bullet {
          background: #A78BFA;
        }
        .dark .reviews-swiper .swiper-pagination-bullet-active {
          background: #A78BFA;
        }
      `}</style>
    </section>
  );
}
