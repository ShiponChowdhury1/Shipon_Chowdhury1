'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download,  } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Typewriter from 'typewriter-effect';

export default function HeroSection() {
  
  // Intersection Observer hooks for counters
  const { ref: clientsRef, inView: clientsInView } = useInView({ threshold: 0.1 });
  const { ref: projectsRef, inView: projectsInView } = useInView({ threshold: 0.1 });
  const { ref: designsRef, inView: designsInView } = useInView({ threshold: 0.1 });
  const { ref: experienceRef, inView: experienceInView } = useInView({ threshold: 0.1 });



  return (
    <section id="home" className="min-h-screen pt-32 pb-[30px] px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16">
          {/* Left Column - Text Content */}
          <div className="space-y-8 md:shrink-0">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-5xl font-bold text-black dark:text-white leading-tight font-heading">

               <span className='text-[#7C4DFF]'>Hi,</span> I&apos;m <span className='text-black dark:text-white'>Shipon Chowdhury </span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 font-heading">
              <span className='text-[#7C4DFF]'>Frontend</span> Developer 
              </h2>
              <div className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg font-body">
                <Typewriter
  options={{
    strings: [
      'Building fast, scalable web applications with React & Next.js.',
      'Turning designs into responsive, pixel-perfect user interfaces.',
      'Creating smooth, interactive experiences for modern web users.',
      'Writing clean, efficient code for high-performance websites.',
      'Crafting frontend solutions that are both functional and elegant.'
    ],
    autoStart: true,
    loop: true,
    delay: 50,
    deleteSpeed: 30,
  }}
/>
              </div>
            </div>
              
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/Shipon_Chowdhury.pdf"
                download="Shipon_Chowdhury.pdf"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 ease-in-out transform hover:scale-105 font-medium group shadow-lg hover:shadow-xl font-body"
              >
                Download CV
                <Download className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-4 border-[1.5px] border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105 font-medium group shadow-md hover:shadow-lg font-body"
              >
               View Work
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
      
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex justify-end items-center md:flex-1">
            <div className="relative w-80 h-80 md:w-md md:h-112 my-8">
              {/* Circular background with shadow */}
              <div className="absolute inset-0" />
              
              {/* Profile Image Placeholder */}
              <div className="absolute inset-0  overflow-hidden flex items-center justify-center">
              <Image
                  src="/profile/shipon.png"
                  alt="Shipon Chowdhury"
                  width={621}
                  height={664}
                  className="w-full h-full object-cover opacity-100 animate-depth-move"
                  priority
                /> 
              </div>
            </div>
          </div>
        </div>
      {/* client projects design experience  */}
              
            <div className="grid md:grid-cols-5 grid-cols-2 gap-4 mt-6 bg-white dark:bg-[#15192D] p-6 rounded-lg shadow-md border border-gray-200 dark:border-[#2D3554]">
          <div className="text-center">
            <p ref={clientsRef} className="text-4xl font-bold text-[#7C4DFF] mb-2">
              {clientsInView ? <CountUp end={10} duration={2} /> : '0'}+
            </p>
            <p className="text-gray-600 dark:text-muted-foreground text-[24px] font-body">Clients</p>
          </div>
          <div className="text-center">
            <p ref={projectsRef} className="text-4xl font-bold text-[#7C4DFF] mb-2">
              {projectsInView ? <CountUp end={11} duration={2} /> : '0'}+
            </p>
            <p className="text-gray-600 dark:text-muted-foreground text-[24px] font-body">Projects</p>
          </div>
          <div className="text-center">
            <p ref={designsRef} className="text-4xl font-bold text-[#7C4DFF] mb-2">
              {designsInView ? <CountUp end={40} duration={2} /> : '0'}+
            </p>
            <p className="text-gray-600 dark:text-muted-foreground text-[24px] font-body">Figma</p>
          </div>
          <div className="text-center">
            <p ref={experienceRef} className="text-4xl font-bold text-[#7C4DFF] mb-2">
              {experienceInView ? <CountUp end={2} duration={2} /> : '0'}+
            </p>
            <p className="text-gray-600 dark:text-muted-foreground text-[24px] font-body">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#7C4DFF] mb-2">5★</p>
            <p className="text-gray-600 dark:text-muted-foreground text-[24px] font-body">Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}
