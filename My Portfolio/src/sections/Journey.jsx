import { motion } from 'framer-motion';
import { FiBriefcase, FiAward, FiBookOpen, FiActivity, FiMapPin, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import timelineData from '../data/timeline.json';

const TYPE_ICONS = {
  'Engineering Internship': FiBriefcase,
  'Specialized Professional Certification': FiAward,
  'Peer-Reviewed Research Publication': FiBookOpen,
  'Technical Symposium & Competition': FiActivity,
  'Technical Symposium Milestone': FiActivity,
  'Hands-On Technical Workshop': FiActivity,
};

export function Journey() {
  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-slate-950/40 light:bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <FiActivity className="w-3.5 h-3.5" />
            <span>Milestones &amp; Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white light:text-slate-900 tracking-tight">
            Engineering Journey &amp; Training
          </h2>
          <p className="mt-3 text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Hands-on enterprise internships, accredited Java certifications, peer-reviewed international publications, and national symposia.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500 via-cyan-400 to-indigo-600 -translate-x-1/2 opacity-30 md:opacity-40" />

          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = TYPE_ICONS[item.type] || FiBriefcase;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-8 h-8 rounded-full bg-[#0a0d16] border-2 border-indigo-400 flex items-center justify-center shadow-glow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isEven ? 'md:pl-10' : 'md:pr-10'
                    } w-full`}
                    initial={{ opacity: 0, y: 25, x: isEven ? 25 : -25 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <div className="p-6 sm:p-7 rounded-2xl glass-card border border-slate-800/80 light:border-slate-200 hover:border-indigo-500/40 transition-all shadow-xl group">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                          <Icon className="w-3 h-3" />
                          {item.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <FiCalendar className="w-3 h-3 text-cyan-400" />
                          {item.period}
                        </span>
                      </div>

                      {/* Role & Org */}
                      <h3 className="text-lg sm:text-xl font-bold font-display text-white light:text-slate-900 group-hover:text-indigo-400 transition-colors">
                        {item.role}
                      </h3>
                      <div className="text-sm font-semibold text-cyan-400/90 light:text-cyan-700 mt-0.5">
                        {item.organization}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-1 mb-4">
                        <FiMapPin className="w-3 h-3 text-slate-500" />
                        <span>{item.location}</span>
                      </div>

                      {/* Narrative */}
                      <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Engineered Outcomes */}
                      <ul className="space-y-2 mb-4">
                        {item.bulletPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 light:text-slate-600">
                            <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/70 light:border-slate-200">
                        {item.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
