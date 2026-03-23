export interface CaseStudy {
  problem: string;
  solution: string;
  process: string[];
}

export interface Outcome {
  [key: string]: string;
}

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  secondTitle?: string;
  projectType?: string;
  services?: string[];
  shortDescription: string;
  longDescription?: string;
  category: string;
  tags?: string[];
  timeline?: string;
  tools?: string[];
  heroImage: string;
  figmaLink?: string;
}

export interface Review {
  id: string;
  clientName: string;
  clientPhoto: string;
  rating: number;
  reviewText: string;
  company?: string;
}