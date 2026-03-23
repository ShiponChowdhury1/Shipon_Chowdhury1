'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, Download } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

interface CVData {
  _id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  uploadedBy: string;
  isActive: boolean;
  createdAt: string;
}

export default function CVManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentCV, setCurrentCV] = useState<CVData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session || (session.user as any)?.role !== 'admin') {
      router.push('/admin/login');
      return;
    }

    fetchCurrentCV();
  }, [session, status, router]);

  const fetchCurrentCV = async () => {
    try {
      const response = await fetch('/api/cv');
      if (response.ok) {
        const data = await response.json();
        setCurrentCV(data);
      }
    } catch (error) {
      console.error('Error fetching CV:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.append('uploadedBy', (session?.user as any)?.email || 'admin');

      // Upload file to server
      const response = await fetch('/api/cv/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentCV(data.cv);
        alert('CV uploaded successfully! Hero section will automatically show the new CV.');
        
        // Refresh the page to show updated CV
        window.location.reload();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload CV');
      }
    } catch (error) {
      console.error('Error uploading CV:', error);
      alert(`Failed to upload CV: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-[#0D101D]">
        <AdminSidebar />
        <div className="flex-1 ml-0 md:ml-[calc(8%+280px)] md:mr-[8%] p-4 md:p-8 mt-16 md:mt-0">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0D101D]">
      <AdminSidebar />
      
      <div className="flex-1 ml-0 md:ml-[calc(8%+280px)] md:mr-[8%] w-full">
        <div className="p-4 md:p-8 mt-16 md:mt-0">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 font-heading">
              CV Management
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-body">
              Upload and manage your resume/CV
            </p>
          </div>

          {/* Current CV Card */}
          {currentCV ? (
            <div className="bg-white dark:bg-[#15192D] rounded-lg border border-gray-200 dark:border-[#2D3554] p-4 md:p-8 mb-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 md:w-8 md:h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white font-heading break-all">
                      {currentCV.fileName}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-body">
                      Size: {(currentCV.fileSize / 1024).toFixed(2)} KB
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-body">
                      Uploaded: {new Date(currentCV.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={currentCV.filePath}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/90 transition-colors font-body"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#15192D] rounded-lg border border-gray-200 dark:border-[#2D3554] p-8 mb-6">
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 font-heading">
                  No CV uploaded
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-body">
                  Upload your first CV to get started
                </p>
              </div>
            </div>
          )}

          {/* Upload New CV */}
          <div className="bg-white dark:bg-[#15192D] rounded-lg border border-gray-200 dark:border-[#2D3554] p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-heading">
              Upload New CV
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-body">
              Upload a new CV to replace the current one. Only PDF files are accepted (Max 5MB).
            </p>
            
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 dark:border-[#2D3554] border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-[#0D101D] hover:bg-gray-100 dark:hover:bg-[#1A1F35] transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300 font-body">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-body">
                  PDF only (MAX. 5MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>

            {isUploading && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 text-[#7C4DFF] font-body">
                  <div className="w-4 h-4 border-2 border-[#7C4DFF] border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-300 font-body">
                <strong>✓ Automatic Upload:</strong> Your CV will be automatically saved and the hero section will be updated instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
