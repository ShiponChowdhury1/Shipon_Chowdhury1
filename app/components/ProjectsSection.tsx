'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '../../types';

interface ProjectCardProps extends Project {
  _id?: string;
  index?: number;
  large?: boolean;
  scrollDirection?: 'down' | 'up';
}

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
    // Ignore invalid URL and fallback to local placeholder.
  }

  return '/hero.png';
}

export function ProjectCard({
  _id,
  title,
  secondTitle,
  shortDescription,
  heroImage,
  slug,
  index = 0,
  large = false,
  scrollDirection = 'down',
}: ProjectCardProps) {
  const imageScrollClass =
    scrollDirection === 'up'
      ? 'object-bottom group-hover:object-top duration-2000'
      : 'object-top group-hover:object-bottom duration-2000';
  const safeHeroImage = getSafeImageSrc(heroImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={`group bg-white dark:bg-[#15192D] border border-gray-200 dark:border-[#2D3554] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 w-full h-full min-h-[200px] flex flex-col ${
        large ? 'max-w-none p-5' : 'max-w-[366.67px] p-4'
      }`}
    >
      {/* Thumbnail */}
      <motion.div 
        className={`relative overflow-hidden bg-muted rounded-xl ${large ? 'h-72 lg:h-80' : 'h-48'}`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={safeHeroImage}
          alt={title}
          fill
          className={`object-cover transition-all ease-linear ${imageScrollClass}`}
        />
        <motion.div
          className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>

      {/* Content */}
      <div className={`flex-1 space-y-4 flex flex-col ${large ? 'py-7' : 'py-6'}`}>
        <div className="flex-1">
          <motion.h3 
            className={`font-semibold text-card-foreground group-hover:text-primary transition-colors font-heading ${large ? 'text-2xl' : 'text-xl'}`}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
          {secondTitle && (
            <motion.p 
              className="text-sm mt-1 font-medium font-body text-[#7C4DFF]"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.2 }}
            >
              {secondTitle}
            </motion.p>
          )}
          <motion.p 
            className={`text-muted-foreground mt-2 font-body ${large ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3 }}
          >
            {shortDescription}
          </motion.p>
        </div>

        {/* Links - Always at bottom */}
        <motion.div 
          className="flex gap-3 pt-4 border-t border-border mt-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.4 }}
        >
          <Link
            href={`/projects/${_id || slug}`}
            className="flex items-center gap-2 px-4 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex-1 justify-center font-body group/button"
          >
            <ExternalLink className="w-4 h-4 group-hover/button:rotate-45 transition-transform duration-300" />
            View Project
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface ProjectsSectionProps {
  projects: (Project & { _id?: string })[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-xl md:text-5xl font-bold text-foreground mb-4 font-heading text-center lg:text-left">
            Featured Projects
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 items-stretch">
          {projects.slice(0, 2).map((project, index) => (
            <ProjectCard
              key={project._id || project.slug}
              {...project}
              index={index}
              large
              scrollDirection={index % 2 === 0 ? 'down' : 'up'}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium font-body group/link"
            >
              View All Projects
              <ExternalLink className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
