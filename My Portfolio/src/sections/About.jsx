import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCheckCircle, FiMapPin, FiMail, FiPhone, FiExternalLink, FiAward, FiLayers, FiCode, FiFolder } from 'react-icons/fi';
import { FaJava, FaReact, FaDatabase } from 'react-icons/fa';

function Counter({ end, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="font-mono text-3xl sm:text-4xl font-extrabold text-white light:text-slate-900">
      {count}{suffix}
    </span>
  );
}

export function About({ profile }) {
  const stats = [
    { value: 6, suffix: '+', label: 'Systems Engineered', icon: FiFolder, desc: 'Enterprise, full-stack & IoT platforms' },
    { value: 15, suffix: '+', label: 'Technologies Mastered', icon: FiCode, desc: 'Java, Spring, SQL & modern web' },
    { value: 12, suffix: '+', label: 'GitHub Repositories', icon: FiLayers, desc: 'Public repositories & codebases' },
    { value: 4, suffix: '+', label: 'Verified Certifications', icon: FiAward, desc: 'IAO accredited & technical trainings' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-3">
            <span>Engineering Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white light:text-slate-900 tracking-tight">
            Architecting Resilient Code with Technical Depth
          </h2>
          <p className="mt-3 text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Leading with real systems, clean modular patterns, and measurable operational outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Profile Photo with Glowing Animated Frame */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative group max-w-sm w-full">
              {/* Outer pulsing glow aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-600 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />

              {/* Main Photo Frame Card */}
              <div className="relative rounded-3xl bg-[#0c101c] p-3 border border-indigo-500/30 overflow-hidden shadow-2xl">
                <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-slate-900/80 flex items-center justify-center">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = './boy.png';
                    }}
                  />

                  {/* Gradient shadow overlay at bottom of photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d16] via-transparent to-transparent opacity-80" />

                  {/* Floating Tech Badges on photo */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/70 shadow-lg">
                      <FaJava className="text-amber-400 w-4 h-4" />
                      <span className="text-xs font-mono font-medium text-slate-200">Java Full Stack</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-xl border border-emerald-500/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-mono font-medium text-emerald-300">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Micro info strip */}
                <div className="p-4 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <FiMapPin className="text-indigo-400" /> Trichy, India
                  </span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-1 text-slate-300 hover:text-indigo-300 transition-colors"
                  >
                    <span>Connect</span>
                    <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Proof of Work */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4 text-slate-300 light:text-slate-700 leading-relaxed text-base sm:text-lg">
              <p className="font-medium text-white light:text-slate-900 text-lg sm:text-xl">
                {profile.bio}
              </p>
              <p className="text-sm sm:text-base text-slate-400 light:text-slate-600">
                Specialized in the full product lifecycle: from relational database normalization and transactional ACID integrity in MySQL to microservice API contracts and clean modular architectures. Experienced in building enterprise customer systems, circulation engines, and IoT telemetry architectures published in peer-reviewed engineering journals.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8 mb-8">
              <div className="p-4 rounded-xl bg-slate-900/50 light:bg-slate-100 border border-slate-800 light:border-slate-300 flex items-start gap-3">
                <FiCheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white light:text-slate-900">
                    Clean Architecture &amp; OOP
                  </h4>
                  <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                    SOLID principles, DAO patterns, strict layered boundaries
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 light:bg-slate-100 border border-slate-800 light:border-slate-300 flex items-start gap-3">
                <FiCheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white light:text-slate-900">
                    High-Reliability Backends
                  </h4>
                  <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                    Spring Boot, REST APIs, connection pooling &amp; JDBC
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 light:bg-slate-100 border border-slate-800 light:border-slate-300 flex items-start gap-3">
                <FiCheckCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white light:text-slate-900">
                    Relational Optimization
                  </h4>
                  <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                    MySQL schema design, query indexing &amp; constraint integrity
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 light:bg-slate-100 border border-slate-800 light:border-slate-300 flex items-start gap-3">
                <FiCheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white light:text-slate-900">
                    Published Research &amp; IoT
                  </h4>
                  <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                    Peer-reviewed author on MQTT telemetry in IJNIET
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Pills */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-6">
              <span className="flex items-center gap-1.5 text-slate-300">
                <FiMail className="text-indigo-400" /> {profile.email}
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <FiPhone className="text-cyan-400" /> {profile.phone}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Count-Up Proof of Work Stats Grid (No Years of Experience!) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800/80 light:border-slate-200 text-center relative overflow-hidden group hover:border-indigo-500/40 transition-colors"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-200 light:text-slate-800 mt-1">
                  {stat.label}
                </h4>
                <p className="text-[11px] text-slate-400 light:text-slate-500 mt-0.5 leading-tight">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
