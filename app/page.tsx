import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import MyDesignProcess from './components/MyDesignProcess';
import ServicesSection from './components/ServicesSection';
import SkillsAndToolsSection from './components/SkillsAndToolsSection';
import ProjectsSection from './components/ProjectsSection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import dbConnect from '@/lib/mongodb';
import { Project } from '@/lib/models';

export default async function Home() {
  await dbConnect();
  const projectsData = await Project.find({}).limit(3).sort({ createdAt: -1 }).lean();
  
  const projects = projectsData.map(project => ({
    ...project,
    _id: project._id.toString(),
  }));

  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <HeroSection />
       <ProjectsSection projects={projects} />
      <AboutSection />
      <MyDesignProcess />
      <SkillsAndToolsSection />
      <ReviewsSection />
       <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
