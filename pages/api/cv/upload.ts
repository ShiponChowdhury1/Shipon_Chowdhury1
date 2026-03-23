import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import { CV } from '../../../lib/models';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await dbConnect();

  const uploadDir = path.join(process.cwd(), 'public', 'profile');
  
  // Ensure upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    filename: (name, ext) => {
      return `Rahik_Ahsan_CV_${Date.now()}${ext}`;
    },
  });

  try {
    const [fields, files] = await form.parse(req);
    
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check if file is PDF
    if (!file.mimetype?.includes('pdf')) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ error: 'Only PDF files are allowed' });
    }

    const fileName = path.basename(file.filepath);
    const filePath = `/profile/${fileName}`;

    // Deactivate all previous CVs
    await CV.updateMany({}, { isActive: false });

    // Create new CV record
    const uploadedBy = Array.isArray(fields.uploadedBy) ? fields.uploadedBy[0] : fields.uploadedBy;
    
    const cv = await CV.create({
      fileName: file.originalFilename || fileName,
      filePath: filePath,
      fileSize: file.size,
      uploadedBy: uploadedBy || 'admin',
    });

    res.status(201).json({
      success: true,
      cv,
      message: 'CV uploaded successfully',
    });
  } catch (error) {
    console.error('Error uploading CV:', error);
    res.status(500).json({ 
      error: 'Failed to upload CV',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
