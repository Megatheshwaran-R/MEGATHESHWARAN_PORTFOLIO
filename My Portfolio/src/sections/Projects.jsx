import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight, FiCheckCircle, FiFilter, FiLayers } from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';
import { TiltCard } from '../components/TiltCard';
import { ProjectModal } from '../components/ProjectModal';
import projectsData from '../data/projects.json';

const CATEGORIES = ['All', 'Full Stack', 'Backend'];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === 'All') return true;
    return project.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-950/40 light:bg-slate-50/50">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
              <FiLayers className="w-3.5 h-3.5" />
              <span>Core Engineering Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white light:text-slate-900 tracking-tight">
              Featured Systems &amp; Case Studies
            </h2>
            <p className="mt-3 text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
              Real enterprise architectures, transaction management engines, and published IoT telemetry platforms. Click any card to inspect full system specs.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2 bg-slate-900/80 light:bg-slate-200/80 p-1.5 rounded-2xl border border-slate-800 light:border-slate-300">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-glow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <TiltCard className="h-full flex flex-col p-6 sm:p-8 bg-[#0e1322]/85 light:bg-white/90 border border-slate-800/80 light:border-slate-200 hover:border-indigo-500/40 transition-all shadow-xl">
                  {/* Card Header & Badges */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {project.category}
                      </span>
                      {project.badge && (
                        <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 flex items-center gap-1.5">
                          <FaJava className="w-3 h-3 text-cyan-400" />
                          {project.badge}
                        </span>
                      )}
                    </div>

                    {project.featured && (
                      <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        Featured Case Study
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white light:text-slate-900 tracking-tight group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-300/90 font-medium mt-1 mb-4">
                    {project.subtitle}
                  </p>

                  {/* Metrics preview chips */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 my-3 p-3 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-slate-800/60 light:border-slate-200">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="text-center">
                          <div className="font-mono text-xs font-bold text-cyan-400 light:text-cyan-700">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Problem & Solution Snippets */}
                  <div className="space-y-3 my-4 flex-1">
                    <div className="text-xs text-slate-300 light:text-slate-700 leading-relaxed">
                      <span className="font-semibold text-rose-300 font-mono">Problem: </span>
                      {project.problem}
                    </div>
                    <div className="text-xs text-slate-300 light:text-slate-700 leading-relaxed">
                      <span className="font-semibold text-emerald-300 font-mono">Solution: </span>
                      {project.solution}
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 my-4">
                    {project.techStack.slice(0, 5).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-slate-700/60 light:border-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="px-2 py-1 text-[11px] font-mono text-slate-400">
                        +{project.techStack.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-4 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between mt-auto">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 font-mono group"
                    >
                      <span>Deep Dive Case Study</span>
                      <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub repository for ${project.title}`}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        >
                          <FiGithub className="w-4 h-4" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live demo for ${project.title}`}
                          className="p-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white border border-indigo-500/30 transition-colors"
                        >
                          <FiExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
