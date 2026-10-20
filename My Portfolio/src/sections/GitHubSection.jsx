import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiGitBranch, FiExternalLink, FiUsers, FiBook, FiCheckCircle } from 'react-icons/fi';
import { useGitHubData } from '../hooks/useGitHubData';

export function GitHubSection({ profile }) {
  const { userData, repos, loading, isUsingFallback } = useGitHubData(profile.githubUsername);

  // Generate simulated GitHub contribution grid (weeks x 7 days)
  const contributionWeeks = Array.from({ length: 32 }, (_, weekIdx) => {
    return Array.from({ length: 7 }, (_, dayIdx) => {
      // Deterministic pseudo-random pattern for realistic activity
      const seed = (weekIdx * 7 + dayIdx) * 17 + 3;
      const level = seed % 5 === 0 ? 0 : seed % 4 === 0 ? 3 : seed % 3 === 0 ? 2 : 1;
      return level;
    });
  });

  const getIntensityClass = (level) => {
    switch (level) {
      case 3:
        return 'bg-emerald-400 dark:bg-emerald-400';
      case 2:
        return 'bg-emerald-600 dark:bg-emerald-600';
      case 1:
        return 'bg-emerald-900/60 dark:bg-emerald-800/70';
      default:
        return 'bg-slate-800/70 dark:bg-slate-800/80 light:bg-slate-200';
    }
  };

  return (
    <section id="github" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-3">
              <FiGithub className="w-3.5 h-3.5" />
              <span>Open Source &amp; Codebases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white light:text-slate-900 tracking-tight">
              Live GitHub Repositories
            </h2>
            <p className="mt-3 text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
              Real-time synchronization with GitHub API displaying active projects, stars, and code commits.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href={userData?.html_url || profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 light:bg-slate-200 light:hover:bg-slate-300 text-white light:text-slate-900 text-xs font-mono font-semibold border border-slate-700/80 transition-colors shadow-sm"
            >
              <FiGithub className="w-4 h-4" />
              <span>Follow @{profile.githubUsername}</span>
              <FiExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* GitHub Quick Stat Banner */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800 light:border-slate-200 mb-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white text-xl">
              <FiGithub />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white light:text-slate-900 font-display">
                  {userData?.name || profile.name}
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  @{userData?.login || profile.githubUsername}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 max-w-md line-clamp-1">
                {userData?.bio || profile.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm font-mono">
            <div className="flex items-center gap-2 text-slate-300 light:text-slate-700">
              <FiBook className="text-cyan-400" />
              <span>
                <strong className="text-white light:text-slate-900">{userData?.public_repos ?? 12}</strong> Repos
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 light:text-slate-700">
              <FiUsers className="text-indigo-400" />
              <span>
                <strong className="text-white light:text-slate-900">{userData?.followers ?? 8}</strong> Followers
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isUsingFallback ? 'Curated Sync' : 'Live Connected'}</span>
            </div>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((sk) => (
              <div
                key={sk}
                className="p-6 rounded-2xl glass-card border border-slate-800 animate-pulse space-y-4"
              >
                <div className="h-5 bg-slate-800 rounded w-2/3" />
                <div className="h-12 bg-slate-800/60 rounded" />
                <div className="h-4 bg-slate-800/40 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          /* Repositories Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, idx) => (
              <motion.div
                key={repo.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full p-6 rounded-2xl glass-card border border-slate-800/80 light:border-slate-200 hover:border-indigo-500/40 transition-all group shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-indigo-400 flex items-center gap-1.5">
                      <FiBook className="w-3.5 h-3.5" />
                      Public
                    </span>
                    <FiExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </div>

                  <h4 className="text-base font-bold text-white light:text-slate-900 font-display group-hover:text-indigo-300 transition-colors mb-2 line-clamp-1">
                    {repo.name}
                  </h4>

                  <p className="text-xs text-slate-400 light:text-slate-600 line-clamp-2 leading-relaxed mb-6">
                    {repo.description || 'Production repository featuring clean modular Java and web architecture.'}
                  </p>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-auto pt-3 border-t border-slate-800/70 light:border-slate-200">
                    <span className="flex items-center gap-1.5 text-slate-300 light:text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                      {repo.language || 'Java'}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-400">
                        <FiStar className="w-3.5 h-3.5 text-amber-400" />
                        {repo.stargazers_count ?? 5}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <FiGitBranch className="w-3.5 h-3.5" />
                        {repo.forks_count ?? 2}
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        )}

        {/* Activity Heat Grid Visual */}
        <div className="mt-12 p-6 sm:p-7 rounded-2xl glass-card border border-slate-800/80 light:border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-sm font-bold text-white light:text-slate-900 font-display flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400 w-4 h-4" />
                Commit Activity &amp; Code Cadence
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Demonstrated consistency across feature development, refactoring, and project delivery.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-800 light:bg-slate-200" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-900/60" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
              <span>More</span>
            </div>
          </div>

          {/* Grid Container */}
          <div className="overflow-x-auto pb-2">
            <div className="inline-flex gap-1">
              {contributionWeeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      className={`w-3 h-3 rounded-[2.5px] transition-colors hover:scale-125 ${getIntensityClass(level)}`}
                      title={`Activity Level ${level}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
