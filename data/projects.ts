import { Project } from '../types';
import { Smartphone, Globe, LayoutDashboard, Search, Layers, Target } from 'lucide-react';
import { Code, Lightbulb, Sparkles } from 'lucide-react';
export const projects: Project[] = [
  {
    "title": "AI Medical App",
    "slug": "ai-medical-app",
    "secondTitle": "Mobile App Design",
    "services": [
      "Mobile App Design",
      "Web App Design",
      "Website Design",
      "Dashboard Design"
    ],
    "shortDescription": "A modern AI-powered medical app designed for seamless healthcare experiences across mobile and web platforms.",
    "category": "Healthcare / AI",
    "heroImage": "https://res.cloudinary.com/dtojrlekw/image/upload/v1765605943/Med_elbprn.png",
    "figmaLink": "https://www.figma.com/design/94KocbpjkXh5tkKszFdxdU/Medical?node-id=12-31&t=5YqeG6ZgdVef9HUQ-1"
  },
  {
    "title": "Restaurant Management ",
    "slug": "Mobile App design & Web App",
    "secondTitle": "Web APP Design",
    "services": [
      "Mobile App Design",
      "Web App Design"
    ],
    "shortDescription": "Create stunning AI-generated videos effortlessly with a fast, clean, and modern workflow.",
    "category": "Automotive / AI",
    "heroImage": "https://res.cloudinary.com/dtojrlekw/image/upload/v1765604840/food_fjvltj.png",
    "figmaLink": "https://www.figma.com/design/saeDS0V0C5mzroPE0dDEOI/Restaurant-Management?node-id=1-7556&t=h7NjY5XEgXfjH8hP-1"
  },
  {
    "title": "Ai Video Generation Platform",
    "slug": "Dashboard web App Design",
    "secondTitle": "Dashboard Design",
    "services": [
      "Dashboard Design",
      "Web App Design"
    ],
    "shortDescription": "A peaceful space to reset your mind, reduce stress, and giving you the break you need to move forward.",
    "category": "Ecommerce / SaaS",
    "heroImage": "https://res.cloudinary.com/dau8sazoh/image/upload/v1765521566/Dashboard_1_ryuind.png",
    "figmaLink": "https://www.figma.com/design/kuqkecL6tQCcS87SHqFvzY/Clip-forge?node-id=22-1650&t=UDZdMAF1cubViKVE-0"
  },
  {
    "title": "Reality Reset & Mindfulness",
    "slug": "App web App Design",
    "secondTitle": "Website Design",
    "services": [
      "Mobile App Design",
      "Web App Design"
    ],
    "shortDescription": "A comprehensive operations dashboard for airline crew scheduling, live flight monitoring, and disruption control.",
    "category": "Enterprise / Aviation",
    "heroImage": "https://res.cloudinary.com/dtojrlekw/image/upload/v1765605189/Reset_rzimsb.png",
    "figmaLink": "https://www.figma.com/design/qLeJ59hc2yg2y3QhumtpqT/Reset?node-id=3-3&t=U4XohpkwfXphv8dj-1"
  },
  {
    "title": "Movie Website Design",
    "slug": "Web App Design",
    "secondTitle": "Mobile App Design",
    "services": [
      "Website Design",
      "Web App Design"
    ],
    "shortDescription": "A VR-based telemedicine system enabling doctors to diagnose remotely using immersive XR environments.",
    "category": "Healthcare / XR UI",
    "heroImage": "https://res.cloudinary.com/dtojrlekw/image/upload/v1765605916/Apple_iMac_21.5__2019_shm8gn.jpg",
    "figmaLink": "https://www.figma.com/design/eKkJLo42Wh6zcetTqeBF5l/StreamLab-Web-App?node-id=4-4&t=VQuHJ7x85jjLjx8v-1"
  },
  {
    "title": "Astrology Ai Finance",
    "slug": "Dashboard web-app-design",
    "secondTitle": "Dashboard Design",
    "services": [
      "Dashboard Design",
      "Web App Design"
    ],
    "shortDescription": "A next-generation finance dashboard designed with predictive AI insights, smart budgeting, and automated risk analytics.",
    "category": "Dashboard UI / SaaS",
    "heroImage": "https://res.cloudinary.com/dtojrlekw/image/upload/v1765604735/astro_oxtjjl.png",
    "figmaLink": "https://www.figma.com/design/6RifqEgiITW0WFYEDLHXjV/Astrology-App?node-id=1-2&t=5EnoQJgrpGA5kzBw-1"
  }

]

//];

  export const processSteps = [
    {
      number: '01',
      title: 'Understand',
      description: 'Analyzing requirements, business goals, and user expectations',
    },
    {
      number: '02',
      title: 'Research',
      description: 'Reviewing designs, exploring best practices, and planning solutions',
    },
    {
      number: '03',
      title: 'Plan',
      description: 'Setting up project structure, tools, and component architecture',
    },
    {
      number: '04',
      title: 'Setup Project',
      description: 'Initializing Next.js/React project and configuring environment',
    },
    {
      number: '05',
      title: 'Build UI',
      description: 'Converting Figma/XD designs into pixel-perfect responsive layouts',
    },
    {
      number: '06',
      title: 'Develop Features',
      description: 'Implementing dynamic functionality and interactive components',
    },
    {
      number: '07',
      title: 'API Integration',
      description: 'Connecting with backend APIs and handling data efficiently',
    },
    {
      number: '08',
      title: 'Optimize',
      description: 'Improving performance, SEO, and overall user experience',
    },
    {
      number: '09',
      title: 'Test & Deploy',
      description: 'Testing, debugging, and deploying the final product smoothly',
    },
  ];




   export const services = [
    {
      icon: Smartphone,
      title: 'Frontend Development',
      description: 'Modern, fast, and scalable web applications using React.js and Next.js',
      gradient: 'from-pink-500 to-purple-500',
      image: '/what/mobile.png',
    },
    {
      icon: Globe,
      title: 'Responsive Web Design',
      description: 'Fully responsive websites that look perfect on mobile, tablet, and desktop devices',
      gradient: 'from-cyan-500 to-blue-500',
      image: '/what/website.png',
    },
    {
      icon: LayoutDashboard,
      title: 'Performance Optimization',
      description: 'Optimizing website speed, SEO, and performance for better user experience and rankings',
      gradient: 'from-pink-500 to-rose-500',
      image: '/what/dashboard.png',
    },
    {
      icon: Search,
      title: 'API Integration',
      description: 'Seamless integration with REST APIs and backend services for dynamic functionality',
      gradient: 'from-yellow-500 to-orange-500',
      image: '/what/research.png',
    },
    {
      icon: Layers,
      title: 'Dashboard Development',
      description: 'Interactive and data-driven dashboards with clean UI and smooth user experience',
      gradient: 'from-blue-500 to-indigo-500',
      image: '/what/prototyping.png',
    },
    {
      icon: Target,
      title: 'UI Implementation',
      description: 'Pixel-perfect conversion of UI/UX designs (Figma, Adobe XD) into functional websites',
      gradient: 'from-green-500 to-teal-500',
      image: '/what/ux.png',
    },
  ];




   export const aboutCards = [
    {
      icon: Sparkles,
      title: 'Who I Am',
      description: 'I am a passionate Frontend Developer specializing in Next.js and React.js, focused on building fast, responsive, and user-friendly web applications. I enjoy turning ideas into real, interactive digital experiences that not only look great but also perform smoothly.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Lightbulb,
      title: 'My Approach',
      description: 'I combine clean code, modern design principles, and performance optimization to create seamless user experiences. I pay attention to every detail—from UI responsiveness to code structure—to ensure high-quality and scalable solutions.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Code,
      title: 'My Specialty',
      description: 'My expertise lies in developing dynamic web applications, dashboards, and modern websites using React.js and Next.js. I am dedicated to writing efficient, maintainable code and continuously learning new technologies to improve my skills.',
      color: 'from-green-500 to-emerald-500',
    },
  ];