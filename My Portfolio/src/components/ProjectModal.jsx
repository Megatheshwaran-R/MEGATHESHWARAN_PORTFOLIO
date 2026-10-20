import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink, FiCheckCircle, FiLayers, FiAlertCircle } from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';

export function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0f1422] border border-slate-700/80 p-6 sm:p-8 md:p-10 text-slate-100 shadow-2xl z-10 custom-scrollbar"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {project.category}
                </span>
                {project.badge && (
                  <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                    <FaJava className="w-3 h-3" />
                    {project.badge}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
                {project.title}
              </h2>
              <p className="text-indigo-300 text-sm sm:text-base font-medium mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 flex flex-col items-center text-center"
                  >
                    <span className="text-lg font-bold font-mono text-cyan-400">
                      {metric.value}
                    </span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Problem & Solution Case Study */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
              <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                  <FiAlertCircle className="w-4 h-4" />
                  <span>The Engineering Problem</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <FiCheckCircle className="w-4 h-4" />
                  <span>The Architectural Solution</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Architecture Details */}
            {project.architecture && (
              <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 my-6">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
                  <FiLayers className="w-4 h-4" />
                  <span>System Architecture & Pattern</span>
                </div>
                <p className="text-sm font-mono text-slate-300 leading-relaxed bg-[#0b0e18] p-3 rounded-xl border border-slate-800">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Key Features */}
            <div className="my-6">
              <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Key Engineered Capabilities
              </h3>
              <ul className="space-y-2.5">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <FiCheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Tags */}
            <div className="my-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Technologies & Tools Employed
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-800 text-slate-200 border border-slate-700/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links CTA */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm flex items-center gap-2 border border-slate-700 transition-colors shadow-sm"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium text-sm flex items-center gap-2 shadow-glow-sm transition-all"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    <span>Live Demonstration</span>
                  </a>
                )}
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
