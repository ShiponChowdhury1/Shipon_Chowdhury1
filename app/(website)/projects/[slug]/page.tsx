import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Layers, ExternalLink, Code2 } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import dbConnect from '@/lib/mongodb';
import { Project as ProjectModel } from '@/lib/models';

export async function generateStaticParams() {
  await dbConnect();
  const projects = await ProjectModel.find({}).lean();
  
  return projects.map((project) => ({
    slug: project._id.toString(),
  })).concat(
    projects.map((project) => ({
      slug: project.slug,
    }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  
  let project;
  try {
    project = await ProjectModel.findById(slug).lean();
  } catch {
    project = await ProjectModel.findOne({ slug }).lean();
  }
  
  if (!project) {
    project = await ProjectModel.findOne({ slug }).lean();
  }
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Rahik Ahsan`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  
  // Try to find by _id first, if that fails, try by slug
  let project;
  try {
    project = await ProjectModel.findById(slug).lean();
  } catch {
    // If findById fails (invalid ObjectId), try finding by slug
    project = await ProjectModel.findOne({ slug }).lean();
  }
  
  if (!project) {
    project = await ProjectModel.findOne({ slug }).lean();
  }

  if (!project) {
    notFound();
  }

  const liveLink = project.liveLink || project.figmaLink;
  const codeLink = project.codeLink;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D101D]">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#7C4DFF] dark:hover:text-[#7C4DFF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-4 py-2 bg-[#7C4DFF]/10 text-[#7C4DFF] rounded-full text-sm font-medium">
                  {project.category}
                </span>
                {project.projectType && (
                  <span className="px-4 py-2 bg-gray-100 dark:bg-[#2D3554] text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    {project.projectType}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl font-body">
                {project.shortDescription}
              </p>
            </div>

            {/* Project Meta */}
            <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400 mb-8">
              {project.timeline && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-body">{project.timeline}</span>
                </div>
              )}
              {project.tools && project.tools.length > 0 && (
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  <span className="font-body">{project.tools.join(', ')}</span>
                </div>
              )}
              {project.services && project.services.length > 0 && (
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  <span className="font-body">{project.services.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Project Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                Project Overview
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-body">
                {project.longDescription}
              </p>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-heading">
                    Technologies & Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gray-100 dark:bg-[#2D3554] text-gray-700 dark:text-gray-300 rounded-lg text-sm font-body"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Project Tools Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-[#15192D] rounded-2xl p-8 border border-gray-200 dark:border-[#2D3554] sticky top-24">
                {project.tools && project.tools.length > 0 && (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                      Tools Used
                    </h3>
                    <div className="space-y-3 mb-6">
                      {project.tools.map((tool: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <span className="w-2 h-2 bg-[#7C4DFF] rounded-full"></span>
                          <span className="font-body">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                {project.services && project.services.length > 0 && (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                      Services
                    </h3>
                    <div className="space-y-3 mb-6">
                      {project.services.map((service: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <span className="w-2 h-2 bg-[#7C4DFF] rounded-full"></span>
                          <span className="font-body">{service}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/90 transition-colors w-full justify-center font-body"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Project
                  </a>
                )}

                {codeLink && (
                  <a
                    href={codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 border border-[#2D3554] text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-[#1A1F35] transition-colors w-full justify-center font-body"
                  >
                    <Code2 className="w-4 h-4" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>



        </div>
      </main>

      <Footer />
    </div>
  );
}
