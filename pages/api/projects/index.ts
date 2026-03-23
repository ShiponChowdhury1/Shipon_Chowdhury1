import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import { Project } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const { category, search } = req.query;

        const query: Record<string, unknown> = {};

        if (category && category !== 'All') {
          query.category = category;
        }

        if (search && typeof search === 'string') {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { shortDescription: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(search, 'i')] } }
          ];
        }

        const projects = await Project.find(query).sort({ createdAt: -1 });
        res.status(200).json(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
      }
      break;

    case 'POST':
      try {
        console.log('Creating project with data:', req.body);
        const project = await Project.create(req.body);
        res.status(201).json(project);
      } catch (error) {
        console.error('Error creating project:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to create project';
        res.status(500).json({ 
          error: errorMessage,
          details: []
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}