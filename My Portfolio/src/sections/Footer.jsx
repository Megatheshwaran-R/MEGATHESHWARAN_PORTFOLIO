import { FiLinkedin, FiGithub, FiInstagram, FiFacebook, FiArrowUp, FiTerminal, FiHeart } from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';

export function Footer({ profile }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-[#07090f] border-t border-slate-800/80 text-slate-400 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-glow-sm">
              <div className="w-full h-full bg-[#0a0d16] rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-bold text-sm text-white">
                  MR
                </span>
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-base text-white tracking-tight block">
                {profile.name}
              </span>
              <span className="text-xs font-mono text-indigo-400 flex items-center gap-1">
                <FaJava className="text-amber-400" />
                Java Full Stack Developer
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-indigo-600/20 text-slate-400 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/40 transition-colors"
            >
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-700/40 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <FiGithub className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-pink-600/20 text-slate-400 hover:text-pink-300 border border-slate-800 hover:border-pink-500/40 transition-colors"
            >
              <FiInstagram className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-blue-600/20 text-slate-400 hover:text-blue-300 border border-slate-800 hover:border-blue-500/40 transition-colors"
            >
              <FiFacebook className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-indigo-400 transition-colors px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30"
          >
            <span>Back to Summit</span>
            <FiArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            &copy; {currentYear} {profile.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with React, Vite &amp; Tailwind</span>
            <span className="text-slate-600">&bull;</span>
            <span>Static deploy ready on GitHub Pages</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
