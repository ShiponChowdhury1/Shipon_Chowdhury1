'use client';

import AdminSidebar from '@/app/components/AdminSidebar';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

export default function ProjectsManagerPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Task Management App',
      description: 'Intuitive task management interface design',
      status: 'Published',
      techStack: ['Figma', 'Adobe XD', 'Sketch'],
      date: '2024-12-05',
    },
    {
      id: 2,
      title: 'AI Chat Application',
      description: 'Conversational AI interface design',
      status: 'Published',
      techStack: ['Figma', 'Principle', 'Framer'],
      date: '2024-12-03',
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Clean, modern portfolio design',
      status: 'Published',
      techStack: ['Figma', 'Adobe Creative Suite'],
      date: '2024-11-28',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Draft',
    liveUrl: '',
    githubUrl: '',
    techStack: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding project:', formData);
    setFormData({
      title: '',
      description: '',
      status: 'Draft',
      liveUrl: '',
      githubUrl: '',
      techStack: '',
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-2">Projects</h1>
              <p className="text-neutral-600">Manage your portfolio projects</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Project
            </button>
          </div>

          {/* Projects Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-neutral-900">{project.title}</td>
                      <td className="px-6 py-4 text-neutral-600 text-sm">{project.description}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === 'Published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-600 text-sm">{project.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Project Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
                <div className="sticky top-0 bg-white px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-neutral-900">Add New Project</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddProject} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Project Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Project title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      placeholder="Project description"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-900 mb-2">Live URL</label>
                      <input
                        type="url"
                        name="liveUrl"
                        value={formData.liveUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-900 mb-2">GitHub URL</label>
                      <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-900 mb-2">Tech Stack</label>
                      <input
                        type="text"
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-900 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                      Add Project
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
