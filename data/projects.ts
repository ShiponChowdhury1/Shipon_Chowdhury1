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