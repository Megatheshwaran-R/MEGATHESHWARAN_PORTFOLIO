import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiDownload, FiMail, FiTerminal, FiCheckCircle, FiCode } from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';
import { SiSpringboot, SiMysql, SiReact } from 'react-icons/si';

const ROLES = [
  "Java Full Stack Developer",
  "Spring Boot Engineer",
  "REST API & Backend Architect",
  "Microservices Specialist",
  "IoT Solutions Developer"
];

export function Hero({ profile }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 85);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const offsetPos = el.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({ top: offsetPos, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Animated Gradient Mesh & Particles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 dark:bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/15 dark:bg-cyan-500/15 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-violet-600/10 dark:bg-violet-600/15 rounded-full blur-[140px]" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle, #818cf8 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Punchy Intro & CTAs */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Live Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-mono font-medium mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-glow" />
              <span>Available for Full Stack Opportunities</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-white light:text-slate-900 leading-[1.1] mb-4">
              Hi, I'm{' '}
              <span className="text-gradient">
                {profile.name}
              </span>
            </h1>

            {/* Dynamic Typing Title */}
            <div className="h-14 sm:h-16 flex items-center justify-center lg:justify-start">
              <div className="inline-flex items-center font-mono text-xl sm:text-2xl md:text-3xl font-semibold text-slate-200 light:text-slate-800">
                <span className="text-cyan-400 mr-2.5">&gt;</span>
                <span>{displayText}</span>
                <span className="w-2.5 h-6 sm:h-8 ml-1 bg-indigo-500 animate-pulse inline-block" />
              </div>
            </div>

            {/* Punchy Narrative Bio */}
            <p className="mt-4 text-base sm:text-lg text-slate-300 light:text-slate-600 max-w-2xl leading-relaxed">
              {profile.tagline} Architecting resilient backend systems with Core Java &amp; Spring Boot, optimized relational databases in MySQL, and high-performance interactive interfaces.
            </p>

            {/* Core Tech Stack Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-6 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs font-mono text-slate-300">
                <FaJava className="text-amber-400" /> Java 17+
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs font-mono text-slate-300">
                <SiSpringboot className="text-emerald-400" /> Spring Boot
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs font-mono text-slate-300">
                <SiMysql className="text-blue-400" /> MySQL
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs font-mono text-slate-300">
                <SiReact className="text-cyan-400" /> React
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs font-mono text-slate-300">
                <FiTerminal className="text-indigo-400" /> RESTful APIs
              </span>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-glow flex items-center gap-2 transform hover:-translate-y-0.5 transition-all"
              >
                <FiCode className="w-4 h-4" />
                <span>View Projects</span>
              </button>

              <a
                href={profile.resumeUrl}
                download="Megatheshwaran_R_Resume.pdf"
                className="px-6 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 light:bg-slate-200 light:hover:bg-slate-300 text-white light:text-slate-900 font-semibold text-sm border border-slate-700/70 light:border-slate-300 flex items-center gap-2 transform hover:-translate-y-0.5 transition-all shadow-sm"
              >
                <FiDownload className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-3.5 rounded-2xl text-slate-300 hover:text-white light:text-slate-600 light:hover:text-slate-900 font-semibold text-sm flex items-center gap-2 hover:bg-slate-800/40 transition-colors"
              >
                <FiMail className="w-4 h-4" />
                <span>Let's Talk</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Code Terminal & Tech Preview */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full max-w-md rounded-2xl glass-card border border-indigo-500/20 shadow-2xl p-5 relative overflow-hidden">
              {/* Window Controls */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                  <FaJava className="text-amber-400 w-3.5 h-3.5" />
                  <span>DeveloperController.java</span>
                </div>
                <span className="w-4" />
              </div>

              {/* Code Snippet */}
              <div className="font-mono text-xs leading-relaxed text-slate-300 space-y-1.5 overflow-x-auto py-1">
                <p className="text-indigo-400">@RestController</p>
                <p className="text-indigo-400">@RequestMapping(<span className="text-emerald-300">"/api/v1/engineer"</span>)</p>
                <p className="text-purple-300 font-semibold">public class <span className="text-amber-200">EngineerProfile</span> &#123;</p>
                
                <p className="pl-4 text-slate-400">// Primary Capabilities</p>
                <p className="pl-4">
                  <span className="text-cyan-300">private final String</span> name = <span className="text-emerald-300">"Megatheshwaran R"</span>;
                </p>
                <p className="pl-4">
                  <span className="text-cyan-300">private final String</span> focus = <span className="text-emerald-300">"Enterprise Java &amp; Full Stack"</span>;
                </p>
                
                <p className="pl-4 pt-2 text-indigo-400">@GetMapping(<span className="text-emerald-300">"/status"</span>)</p>
                <p className="pl-4 text-purple-300">public ResponseEntity&lt;Map&gt; getStatus() &#123;</p>
                <p className="pl-8 text-slate-300">
                  <span className="text-cyan-300">return</span> ResponseEntity.ok(Map.of(
                </p>
                <p className="pl-12 text-emerald-300">"status", "Ready to Build",</p>
                <p className="pl-12 text-emerald-300">"architectures", "REST / Microservices",</p>
                <p className="pl-12 text-emerald-300">"cleanCode", Boolean.TRUE</p>
                <p className="pl-8 text-slate-300">));</p>
                <p className="pl-4 text-purple-300">&#125;</p>
                <p className="text-purple-300 font-semibold">&#125;</p>
              </div>

              {/* Status footer inside terminal */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <FiCheckCircle className="w-3.5 h-3.5" /> Built with Spring Boot 3
                </span>
                <span className="text-slate-400">200 OK</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => scrollTo('about')}
            aria-label="Scroll to About section"
            className="flex flex-col items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors group"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 group-hover:text-indigo-400">
              Explore Portfolio
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <FiArrowDown className="w-4 h-4 text-indigo-400" />
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  );
}
