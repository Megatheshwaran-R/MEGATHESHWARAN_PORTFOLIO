import { useState } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { BackToTop } from './components/BackToTop';
import { Toast } from './components/Toast';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Journey } from './sections/Journey';
import { GitHubSection } from './sections/GitHubSection';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

import { useDarkMode } from './hooks/useDarkMode';
import { useActiveSection } from './hooks/useActiveSection';
import profileData from './data/profile.json';

const SECTIONS = ['hero', 'about', 'projects', 'skills', 'journey', 'github', 'certifications', 'contact'];

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [toast, setToast] = useState(null);
  const { isDark, toggle: toggleTheme } = useDarkMode();
  const activeSection = useActiveSection(SECTIONS, 100);

  const showToast = (toastData) => {
    setToast(toastData);
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0c0f17] dark:bg-[#0c0f17] light:bg-[#f8fafc] text-slate-100 light:text-slate-900 transition-colors duration-300 relative selection:bg-indigo-500 selection:text-white">
      {/* Initial Startup Preloader */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* Custom Desktop Interactive Cursor */}
      <CustomCursor />

      {/* Fixed Scroll Progress Bar */}
      <ScrollProgress />

      {/* Sticky Glass Navbar */}
      <Navbar
        activeSection={activeSection}
        isDark={isDark}
        toggleTheme={toggleTheme}
        profile={profileData}
      />

      {/* Main Single-Page Sections */}
      <main>
        <Hero profile={profileData} />
        <About profile={profileData} />
        <Projects />
        <Skills />
        <Journey />
        <GitHubSection profile={profileData} />
        <Certifications />
        <Contact profile={profileData} onToast={showToast} />
      </main>

      {/* Footer */}
      <Footer profile={profileData} />

      {/* Interactive Back to Top Action */}
      <BackToTop />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
