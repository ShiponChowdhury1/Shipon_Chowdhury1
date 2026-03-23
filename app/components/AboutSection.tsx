'use client';

import { motion } from 'framer-motion';
import { aboutCards } from "@/data/projects";



export default function AboutSection() {
  

  return (
    <section id="about" className=" py-10  lg:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className=" mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-xl md:text-5xl font-bold text-foreground mb-4 font-heading text-center lg:text-left">
            About Me
          </h2>
        
        </motion.div>

        {/* About Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative bg-white dark:bg-[#15192D] rounded-2xl p-8 border border-gray-200 dark:border-[#2D3554] hover:border-[#7C4DFF] transition-all duration-300 hover:shadow-lg hover:shadow-[#7C4DFF]/20"
              >
                {/* Gradient Background Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-[#7C4DFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div 
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${card.color} mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Title */}
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-heading group-hover:text-[#7C4DFF] transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {card.title}
                  </motion.h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-body">
                    {card.description}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-[#7C4DFF]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
