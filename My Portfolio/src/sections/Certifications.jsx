import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCheckCircle, FiExternalLink, FiBookOpen, FiCalendar, FiMapPin } from 'react-icons/fi';
import { FaJava, FaGlobe, FaCode, FaBrain, FaGraduationCap } from 'react-icons/fa';
import certData from '../data/certifications.json';

const CERT_ICONS = {
  FaJava,
  FaGlobe,
  FaCode,
  FaBrain,
};

export function Certifications() {
  const [activeTab, setActiveTab] = useState('certifications');

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-slate-950/40 light:bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-3">
            <FiAward className="w-3.5 h-3.5" />
            <span>Credentials &amp; Academics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white light:text-slate-900 tracking-tight">
            Accredited Certifications &amp; Degrees
          </h2>
          <p className="mt-3 text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Formally accredited engineering qualifications, international credential verification IDs, and verified academic distinction.
          </p>

          {/* Toggle Tab Switcher */}
          <div className="inline-flex gap-2 bg-slate-900/80 light:bg-slate-200/80 p-1.5 rounded-2xl border border-slate-800 light:border-slate-300 mt-8">
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
                activeTab === 'certifications'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-glow-sm font-semibold'
                  : 'text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900'
              }`}
            >
              Professional Certifications ({certData.certifications.length})
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-glow-sm font-semibold'
                  : 'text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900'
              }`}
            >
              Academic Qualifications ({certData.education.length})
            </button>
          </div>
        </div>

        {/* Certifications Tab View */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certData.certifications.map((cert, index) => {
              const Icon = CERT_ICONS[cert.icon] || FaCode;

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="p-6 sm:p-7 rounded-2xl glass-card border border-slate-800/80 light:border-slate-200 hover:border-indigo-500/40 transition-all shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Badge & Verification */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-lg">
                          <Icon />
                        </span>
                        <div>
                          <span className="text-[11px] font-mono text-cyan-400 font-semibold block">
                            {cert.badge}
                          </span>
                          <span className="text-xs text-slate-400">
                            {cert.issuer}
                          </span>
                        </div>
                      </div>

                      {cert.credentialId && (
                        <span className="font-mono text-[11px] bg-slate-800/90 light:bg-slate-200 px-2.5 py-1 rounded-lg text-slate-300 light:text-slate-700 border border-slate-700/60">
                          {cert.credentialId}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white light:text-slate-900 group-hover:text-indigo-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-indigo-300 font-mono mt-0.5">
                      Training Provider: {cert.organization}
                    </p>

                    {/* Skills Covered */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {cert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-slate-700/60 light:border-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verification CTA Link */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">
                      {cert.date}
                    </span>

                    {cert.verificationUrl && cert.verificationUrl !== '#' ? (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 font-mono transition-colors"
                      >
                        <span>Verify Credential</span>
                        <FiExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500 font-mono">Verified Curriculum</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Education Tab View */}
        {activeTab === 'education' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {certData.education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-800/80 light:border-slate-200 hover:border-indigo-500/40 transition-all shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl shrink-0">
                      <FaGraduationCap />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-white light:text-slate-900">
                        {edu.degree}
                      </h3>
                      <div className="text-sm font-semibold text-cyan-400 light:text-cyan-700 mt-0.5">
                        {edu.field}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-1">
                        {edu.institution} &bull; {edu.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end gap-1">
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                      {edu.score}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {edu.scoreLabel} ({edu.period})
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mt-4 pt-4 border-t border-slate-800/80 light:border-slate-200">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 light:text-slate-600">
                      <FiCheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
