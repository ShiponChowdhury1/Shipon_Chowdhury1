'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Project } from '../../../types';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import DeleteConfirmation from '../components/DeleteConfirmation';
import AdminSidebar from '../../components/AdminSidebar';

function getSafeImageSrc(src?: string) {
  if (!src) return '/hero.png';

  const trimmed = src.trim();
  if (trimmed.startsWith('/')) return trimmed;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return trimmed;
    }
  } catch {
    // Invalid URL, fallback to local image.
  }

  return '/hero.png';
}

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    projectSlug: string | null;
    isDeleting: boolean;
  }>({
    isOpen: false,
    projectSlug: null,
    isDeleting: false
  });

  const fetchProjects = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filterCategory !== 'All') params.append('category', filterCategory);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/projects?${params.toString()}`);
      if (response.ok) {
        const projects = await response.json();
        setProjectList(projects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filterCategory, searchTerm]);

  useEffect(() => {
    if (status === 'loading') return;

    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }

    // Check if user has admin role
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (session && (session.user as any)?.role !== 'admin') {
      router.push('/admin/login');
      return;
    }

    // Fetch projects if authenticated as admin
    if (status === 'authenticated' && session) {
      fetchProjects();
    }
  }, [session, status, router, fetchProjects]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((session?.user as any)?.role === 'admin') {
      fetchProjects();
    }
  }, [searchTerm, filterCategory, session?.user, fetchProjects]);

  // Get unique categories for filter
  const categories = ['All', ...Array.from(new Set(projectList.map(p => p.category)))];

  // Filter projects based on search and category
  const filteredProjects = projectList.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (slug: string) => {
    setDeleteModal({
      isOpen: true,
      projectSlug: slug,
      isDeleting: false
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.projectSlug) return;

    setDeleteModal(prev => ({ ...prev, isDeleting: true }));

    try {
      const response = await fetch(`/api/projects/${deleteModal.projectSlug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjectList(prev => prev.filter(p => (p._id || p.slug) !== deleteModal.projectSlug));
        setDeleteModal({ isOpen: false, projectSlug: null, isDeleting: false });
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, projectSlug: null, isDeleting: false });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-[#0D101D]">
        <AdminSidebar />
        <div className="flex-1 ml-0 md:ml-[calc(8%+280px)] md:mr-[8%] p-4 lg:p-8 mt-16 md:mt-0">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white dark:bg-[#15192D] rounded-lg p-6 border border-gray-200 dark:border-[#2D3554]">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0D101D]">
      <AdminSidebar />
      
      <div className="flex-1 ml-0 md:ml-[calc(8%+280px)] md:mr-[8%] w-full">
        <div className="p-4 lg:p-8 mt-16 md:mt-0">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 font-heading">Admin Dashboard</h1>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 font-body">Manage your portfolio projects</p>
            </div>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/90 transition-colors font-medium font-body text-sm lg:text-base mt-4 lg:mt-0"
            >
              <Plus className="w-5 h-5" />
              Add New Project
            </Link>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-white dark:bg-[#15192D] rounded-lg p-6 border border-gray-200 dark:border-[#2D3554]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{projectList.length}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-body">Total Projects</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

            <div className="bg-white dark:bg-[#15192D] rounded-lg p-6 border border-gray-200 dark:border-[#2D3554]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{categories.length - 1}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-body">Categories</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Filter className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

            <div className="bg-white dark:bg-[#15192D] rounded-lg p-6 border border-gray-200 dark:border-[#2D3554]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">
                    {Array.from(new Set(projectList.flatMap(p => p.tags))).length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-body">Unique Tags</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

            <div className="bg-white dark:bg-[#15192D] rounded-lg p-6 border border-gray-200 dark:border-[#2D3554]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">
                    {Array.from(new Set(projectList.flatMap(p => p.tools))).length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-body">Unique Tools</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Edit className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

          {/* Filters */}
          <div className="bg-white dark:bg-[#15192D] rounded-lg p-6 border border-gray-200 dark:border-[#2D3554] mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent font-body"
                  />
                </div>
              </div>
              <div className="md:w-64">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent font-body"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

            {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.slug} className="bg-white dark:bg-[#15192D] rounded-lg border border-gray-200 dark:border-[#2D3554] overflow-hidden hover:shadow-lg transition-shadow">
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={getSafeImageSrc(project.heroImage)}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 font-heading">
                      {project.title}
                    </h3>
                    {project.projectType && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium font-body">
                        {project.projectType}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 font-body">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags?.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-[#2D3554] text-gray-700 dark:text-gray-300 rounded text-xs font-body"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags && project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-[#2D3554] text-gray-700 dark:text-gray-300 rounded text-xs font-body">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4 font-body">
                  <span>{project.category}</span>
                  <span>{project.timeline}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/projects/${project._id || project.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-[#2D3554] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3D4564] transition-colors text-sm font-medium font-body"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                  <Link
                    href={`/admin/projects/${project._id || project.slug}/edit`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/90 transition-colors text-sm font-medium font-body"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id || project.slug)}
                    className="px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-[#2D3554] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 font-heading">No projects found</h3>
              <p className="text-gray-600 dark:text-gray-400 font-body">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone and will permanently remove the project from your portfolio."
        isLoading={deleteModal.isDeleting}
      />
    </div>
  );
}