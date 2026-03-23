import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { ProjectCard } from '@/app/components/ProjectsSection';
import dbConnect from '@/lib/mongodb';
import { Project } from '@/lib/models';

export const metadata = {
  title: 'Projects | Rahik Ahsan - UX/UI Designer',
  description: 'View UX/UI design projects and case studies by Rahik Ahsan',
};

export default async function ProjectsPage() {
  await dbConnect();
  const allProjects = await Project.find({}).sort({ createdAt: -1 }).lean();
  
  const projectsWithId = allProjects.map(project => ({
    ...project,
    _id: project._id.toString(),
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D101D]">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
              All Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-body">
              A collection of my recent and past projects showcasing various technologies and solutions
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projectsWithId.map((project, index) => (
              <ProjectCard key={project._id} {...project} index={index} />
            ))}
          </div>

          {/* Show Less Button */}
          <div className="text-center">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium font-body"
            >
              <ArrowLeft className="w-5 h-5" />
              Show Less
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
