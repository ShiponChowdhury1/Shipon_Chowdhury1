'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { services } from "@/data/projects";


export default function ServicesSection() {

  return (
    <section className=" py-2 lg:py-2.5 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto lg:my-8 my-4">
        {/* Section Header */}
        <motion.div 
          className=" -mt-10 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >

          <br />
          <br />
          <h2 className="text-xl md:text-5xl font-bold text-foreground mb-8 lg:mb-4 font-heading text-center lg:text-left">
         What I Can Do For You
          </h2>
    
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative bg-white dark:bg-[#15192D] rounded-2xl p-8 border border-gray-200 dark:border-[#2D3554] hover:border-[#7C4DFF] transition-all duration-300 hover:shadow-lg hover:shadow-[#7C4DFF]/20"
              >
                {/* Gradient Background Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-[#7C4DFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Image Container */}
                  <div className="mb-6">
                    <motion.div 
                      className="w-20 h-20 rounded-[100px] p-5 bg-[#FFFFFF1A] flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-10 h-10">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-heading group-hover:text-[#7C4DFF] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-body">
                    {service.description}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl from-[#7C4DFF]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
