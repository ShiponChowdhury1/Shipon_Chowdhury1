'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '../../../types';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface ProjectFormProps {
  project?: Project;
  isEditing?: boolean;
}

export default function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    secondTitle: '',
    services: [],
    shortDescription: '',
    category: '',
    heroImage: '',
    figmaLink: ''
  });

  useEffect(() => {
    if (project && isEditing) {
      setFormData(project);
    }
  }, [project, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = isEditing
        ? `/api/projects/${project?.slug}`
        : '/api/projects';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert(`Failed to save project: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      setFormData(prev => ({
        ...prev,
        title: value,
        slug: slug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0D101D] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/dashboard"
            className="p-2 bg-white dark:bg-[#15192D] rounded-lg border border-gray-200 dark:border-[#2D3554] hover:bg-gray-50 dark:hover:bg-[#1A1F35] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isEditing ? 'Update project details' : 'Create a new project for your portfolio'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white dark:bg-[#15192D] rounded-lg border border-gray-200 dark:border-[#2D3554] p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Slug (auto-generated) *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-100 dark:bg-[#0D101D] text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  placeholder="auto-generated-from-title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Second Title
                </label>
                <input
                  type="text"
                  name="secondTitle"
                  value={formData.secondTitle || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
                  placeholder="e.g., UI/UX Design"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
                  placeholder="e.g., Education / AI"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hero Image URL *
                </label>
                <input
                  type="text"
                  name="heroImage"
                  value={formData.heroImage}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
                  placeholder="https://res.cloudinary.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Figma Link
                </label>
                <input
                  type="text"
                  name="figmaLink"
                  value={formData.figmaLink || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
                  placeholder="https://www.figma.com/design/..."
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Services *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Mobile App Design', 'Web App Design', 'Website Design', 'Dashboard Design'].map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-3 p-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1A1F35] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.services?.includes(service) || false}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData(prev => ({
                          ...prev,
                          services: isChecked
                            ? [...(prev.services || []), service]
                            : (prev.services || []).filter(s => s !== service)
                        }));
                      }}
                      className="w-5 h-5 text-[#7C4DFF] bg-gray-100 border-gray-300 rounded focus:ring-[#7C4DFF] dark:bg-[#0D101D] dark:border-[#2D3554]"
                    />
                    <span className="text-gray-900 dark:text-white">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Description *
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
                placeholder="Brief project summary"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 border border-gray-300 dark:border-[#2D3554] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1A1F35] transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEditing ? 'Update Project' : 'Create Project'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}