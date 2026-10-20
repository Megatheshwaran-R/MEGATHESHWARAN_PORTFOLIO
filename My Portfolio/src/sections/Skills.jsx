import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaJava,
  FaReact,
  FaDatabase,
  FaTools,
  FaServer,
  FaHtml5,
  FaAngular,
  FaGitAlt,
  FaDocker,
} from 'react-icons/fa';
import {
  SiSpringboot,
  SiSpringsecurity,
  SiHibernate,
  SiJavascript,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiApachemaven,
  SiPostman,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import { FiCheck, FiCpu } from 'react-icons/fi';
import skillsData from '../data/skills.json';

const ICON_MAP = {
  FaJava,
  SiSpringboot,
  TbApi,
  SiSpringsecurity,
  SiHibernate,
  FaServer,
  FaReact,
  SiJavascript,
  FaHtml5,
  SiTailwindcss,
  FaAngular,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  FaGitAlt,
  FaDocker,
  SiApachemaven,
  SiPostman,
  VscVscode,
};

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    ...skillsData.categories,
  ];

  const filteredSkills = skillsData.skills.filter((skill) => {
    if (selectedCategory === 'all') return true;
    return skill.category === selectedCategory;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-3">
            <FiCpu className="w-3.5 h-3.5" />
            <span>Technical Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white light:text-slate-900 tracking-tight">
            Specialized Skills &amp; Architecture
          </h2>
          <p className="mt-3 text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Enterprise Java backend frameworks, ACID relational databases, distributed microservices, and interactive modern frontend stacks.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium font-mono transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-glow-sm font-semibold'
                  : 'bg-slate-900/60 light:bg-slate-200/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 light:text-slate-600 border border-slate-800 light:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const IconComponent = ICON_MAP[skill.icon] || FaServer;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="p-6 rounded-2xl glass-card border border-slate-800/80 light:border-slate-200 hover:border-indigo-500/40 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Header: Icon & Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:text-cyan-400 group-hover:scale-105 transition-all flex items-center justify-center text-xl">
                        <IconComponent />
                      </div>
                      <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-700 border border-slate-700/60 light:border-slate-300">
                        {skill.level}
                      </span>
                    </div>

                    {/* Skill Title */}
                    <h3 className="text-lg font-bold text-white light:text-slate-900 font-display">
                      {skill.name}
                    </h3>

                    {/* Experience Context */}
                    <p className="text-xs text-slate-400 light:text-slate-600 mt-2 leading-relaxed">
                      {skill.experience}
                    </p>
                  </div>

                  {/* Bottom: Proficiency Bar & Tags */}
                  <div className="mt-6 pt-4 border-t border-slate-800/70 light:border-slate-200">
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-400">Proficiency</span>
                      <span className="text-cyan-400 font-semibold">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 light:bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {skill.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800/60 light:bg-slate-100 text-slate-400 light:text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
