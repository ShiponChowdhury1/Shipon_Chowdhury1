import { Project } from '../types';
import { Smartphone, Globe, LayoutDashboard, Search, Layers, Target } from 'lucide-react';
import { Code, Lightbulb, Sparkles } from 'lucide-react';

export const projects: Project[] = [


  {
    "title": "ClipForge - AI Video Generation SaaS",
    "slug": "clipforge-ai-video-generation-saas",
    "secondTitle": "AI Video SaaS Dashboard",
    "services": [
      "Dashboard Development",
      "Frontend Development",
      "API Integration",
      "Performance Optimization"
    ],
    "shortDescription": "Built an AI-powered video generation platform with customizable output, real-time workflow tracking, authentication, and billing features.",
    "longDescription": "ClipForge is an AI-based video generation SaaS where users can generate faceless short-form videos with style, voice, and subtitle customization. I built a multi-step workflow with real-time progress updates, implemented secure authentication (email login, OTP, Google OAuth), integrated subscription billing with credit usage, and created an admin panel to manage users, subscriptions, and analytics.",
    "category": "AI / SaaS",
    "tools": [
      "Next.js",
      "React",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query"
    ],
    "tags": [
      "AI Video Generation",
      "Authentication",
      "Billing",
      "Admin Panel"
    ],
    "heroImage": "https://res.cloudinary.com/dau8sazoh/image/upload/v1775019448/Clipforge-Create-Faceless-Short-Form-Videos-with-AI-04-01-2026_10_57_AM_wplcfs.png",
    "liveLink": "https://clip-forge-ai-video-generate.onrender.com/dashboard",
    "codeLink": "https://github.com/ShiponChowdhury1/Clip-Forge-ai-video-generate.git"
  },

  {
    "title": "AdInsight - AI Content Curation Platform",
    "slug": "adinsight-ai-content-curation-platform",
    "secondTitle": "Content Intelligence Dashboard",
    "services": [
      "Frontend Development",
      "Dashboard Development",
      "API Integration",
      "UI Implementation"
    ],
    "shortDescription": "An AI content curation platform for ad-tech users with role-based dashboards, search workflows, and analytics.",
    "longDescription": "AdInsight is a content platform for ad-tech users with dedicated User and Admin dashboards. I implemented authentication with JWT, OTP, Google OAuth, and LinkedIn OAuth, developed search/filter/bookmark/reading history features, and built admin tools for managing content, users, and analytics.",
    "category": "AdTech / AI",
    "tools": [
      "Next.js",
      "TypeScript",
      "Redux",
      "REST APIs"
    ],
    "tags": [
      "JWT",
      "OTP",
      "Google OAuth",
      "LinkedIn OAuth",
      "Admin Dashboard"
    ],
    "heroImage": "https://res.cloudinary.com/dau8sazoh/image/upload/v1775019295/TrendWatch-Accelerate-your-Advertising-process-04-01-2026_10_54_AM_qgg887.png",
    "liveLink": "https://trendwatch.info/",
    "codeLink": "https://github.com/ShiponChowdhury1/impact-lab-ai-content-curation-platform.git"
  },

  {
    "title": "Bike Rental - Web App",
    "slug": "bike-rental-web-app",
    "secondTitle": "Role-Based Rental Platform",
    "services": [
      "Frontend Development",
      "Dashboard Development",
      "API Integration",
      "Responsive Web Design"
    ],
    "shortDescription": "A role-based bike rental web app with secure authentication, admin management, and a smooth responsive experience.",
    "longDescription": "Built a role-based bike rental platform with JWT and Firebase authentication. Developed an admin dashboard to manage bikes and bookings. Integrated Redux Persist, React Hook Form, Framer Motion, and Lottie for smooth UX. Designed a fully responsive UI with Tailwind CSS and improved performance with reusable components.",
    "category": "Transport / SaaS",
    "tools": [
      "React",
      "Redux",
      "Firebase",
      "TypeScript",
      "Tailwind CSS"
    ],
    "tags": [
      "JWT",
      "Role-Based Access",
      "Admin Dashboard",
      "Redux Persist",
      "Framer Motion"
    ],
    "heroImage": "https://res.cloudinary.com/dau8sazoh/image/upload/v1775023532/RIDEXO-04-01-2026_12_05_PM_q2gvhk.png",
    "liveLink": "https://bike-rental-client.vercel.app/",
    "codeLink": "https://github.com/ShiponChowdhury1/bike-rental-client"
  },

  {
    "title": "PAWSAGE - Pet Tips & Stories Platform",
    "slug": "pawsage-pet-tips-stories-platform",
    "secondTitle": "Social Content Platform",
    "services": [
      "Frontend Development",
      "API Integration",
      "UI Implementation",
      "Responsive Web Design"
    ],
    "shortDescription": "A social-media-style pet platform with role-based access, premium content, and interactive community features.",
    "longDescription": "Developed a social-media-like platform with role-based Admin/User access. Implemented premium content with payment integration and added social features like like, comment, share, and follow with real-time updates. Designed dark mode, animations, and skeleton loaders for better UX. Used TanStack Query for optimized API calls and client-side caching, and built dynamic post creation with search and filters.",
    "category": "Social Platform / PetTech",
    "tools": [
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "Firebase"
    ],
    "tags": [
      "Role-Based Access",
      "Payment Integration",
      "Real-Time Updates",
      "Dark Mode",
      "Skeleton Loaders"
    ],
    "heroImage": "https://res.cloudinary.com/dau8sazoh/image/upload/v1775024457/Mait-Club-Admin-Dashboard-04-01-2026_12_20_PM_vu3b8u.png",
    "liveLink": "https://dashboard.maitclub.com",
    "codeLink": "https://github.com/ShiponChowdhury1/Ai-Powered-Sports-Coaching-Dashboard-app.git"
  },



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