'use client';

import AdminSidebar from '@/app/components/AdminSidebar';
import { BarChart3, Package, MessageSquare } from 'lucide-react';

export default function DashboardHome() {
  const stats = [
    {
      label: 'Total Projects',
      value: '12',
      icon: Package,
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      label: 'Total Reviews',
      value: '48',
      icon: MessageSquare,
      color: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      label: 'Monthly Views',
      value: '2.3K',
      icon: BarChart3,
      color: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
  ];

  const recentProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      status: 'Published',
      date: '2024-12-05',
    },
    {
      id: 2,
      title: 'Task Management App',
      status: 'Draft',
      date: '2024-12-03',
    },
    {
      id: 3,
      title: 'AI Chat Application',
      status: 'Published',
      date: '2024-11-28',
    },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">Welcome Back!</h1>
            <p className="text-neutral-600">Here&apos;s what&apos;s happening with your portfolio today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-neutral-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Projects Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-900">Recent Projects</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((project) => (
                    <tr key={project.id} className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-neutral-900">{project.title}</td>
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
                      <td className="px-6 py-4 text-neutral-600">{project.date}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
