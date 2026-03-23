import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import { Project } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  switch (req.method) {
    case 'GET':
      try {
        // Try to find by _id first, if that fails, try by slug
        let project;
        try {
          project = await Project.findById(slug);
        } catch {
          project = await Project.findOne({ slug });
        }
        
        if (!project) {
          project = await Project.findOne({ slug });
        }

        if (!project) {
          return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(project);
      } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
      }
      break;

    case 'PUT':
      try {
        console.log('Updating project:', slug, 'with data:', req.body);
        
        // Try to find by _id first, if that fails, try by slug
        let project;
        try {
          project = await Project.findByIdAndUpdate(
            slug,
            req.body,
            { new: true, runValidators: true }
          );
        } catch {
          project = await Project.findOneAndUpdate(
            { slug },
            req.body,
            { new: true, runValidators: true }
          );
        }
        
        if (!project) {
          project = await Project.findOneAndUpdate(
            { slug },
            req.body,
            { new: true, runValidators: true }
          );
        }

        if (!project) {
          return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(project);
      } catch (error) {
        console.error('Error updating project:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to update project';
        res.status(500).json({ 
          error: errorMessage,
          details: []
        });
      }
      break;

    case 'DELETE':
      try {
        // Try to find by _id first, if that fails, try by slug
        let project;
        try {
          project = await Project.findByIdAndDelete(slug);
        } catch {
          project = await Project.findOneAndDelete({ slug });
        }
        
        if (!project) {
          project = await Project.findOneAndDelete({ slug });
        }

        if (!project) {
          return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
      } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}