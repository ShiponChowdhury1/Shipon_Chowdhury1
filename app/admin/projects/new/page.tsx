'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProjectForm from '../../components/ProjectForm';
import AdminSidebar from '../../../components/AdminSidebar';

export default function NewProjectPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0D101D]">
      <AdminSidebar />
      
      <div className="flex-1 ml-0 md:ml-[calc(8%+280px)] md:mr-[8%] w-full">
        <div className="py-4 md:py-8 px-4 sm:px-6 lg:px-8 mt-16 md:mt-0">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4 font-body text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-heading">Add New Project</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2 font-body">Create a new project for your portfolio</p>
          </div>

          {/* Project Form */}
          <div className="bg-white dark:bg-[#15192D] rounded-lg border border-gray-200 dark:border-[#2D3554] p-4 md:p-8">
            <ProjectForm />
          </div>
        </div>
      </div>
    </div>
  );
}