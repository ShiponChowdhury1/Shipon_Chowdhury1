import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import { CV } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const activeCV = await CV.findOne({ isActive: true }).sort({ createdAt: -1 });
        
        if (!activeCV) {
          return res.status(404).json({ error: 'No CV found' });
        }

        res.status(200).json(activeCV);
      } catch (error) {
        console.error('Error fetching CV:', error);
        res.status(500).json({ error: 'Failed to fetch CV' });
      }
      break;

    case 'POST':
      try {
        console.log('Creating CV with data:', req.body);
        
        // Deactivate all previous CVs
        await CV.updateMany({}, { isActive: false });
        
        // Create new CV
        const cv = await CV.create(req.body);
        res.status(201).json(cv);
      } catch (error) {
        console.error('Error creating CV:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to create CV';
        res.status(500).json({ error: errorMessage });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
