'use client';

import { motion } from 'framer-motion';
import { processSteps } from "@/data/projects";

export default function MyDesignProcess() {


  return (
    <section id="process" className=" px-4 sm:px-6 lg:px-4 bg-background">
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
            My Development Process
          </h2>
       
        </motion.div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
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
              <div className="relative z-10 flex items-start justify-between gap-6">
                {/* Number */}
                <motion.div 
                  className="shrink-0"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span 
                    className="text-[#7C4DFF]"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 600,
                      fontSize: '32px',
                      lineHeight: '140%',
                      letterSpacing: '0.2%'
                    }}
                  >
                    {step.number}
                  </span>
                </motion.div>

                {/* Text Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg font-body">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-linear-to-tl from-[#7C4DFF]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
         
        </div>
      </div>
    </section>
  );
}
