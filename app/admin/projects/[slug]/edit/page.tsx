'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Project } from '../../../../../types';
import ProjectForm from '../../../components/ProjectForm';
import AdminSidebar from '../../../../components/AdminSidebar';

export default function EditProjectPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${slug}`);
        if (response.ok) {
          const projectData = await response.json();
          setProject(projectData);
        } else {
          setError('Project not found');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to load project');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-[#0D101D]">
        <AdminSidebar />
        <div className="flex-1 ml-[calc(8%+280px)] mr-[8%] flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-[#0D101D]">
        <AdminSidebar />
        <div className="flex-1 ml-[calc(8%+280px)] mr-[8%] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-heading">Error</h1>
            <p className="text-gray-600 dark:text-gray-400 font-body">{error || 'Project not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0D101D]">
      <AdminSidebar />
      <div className="flex-1 ml-[calc(8%+280px)] mr-[8%]">
        <ProjectForm project={project} isEditing={true} />
      </div>
    </div>
  );
}