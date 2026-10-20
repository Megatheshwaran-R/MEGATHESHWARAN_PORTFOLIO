import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18 + 12);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#07090e] text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* Animated Background Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-indigo-600/20 blur-[100px] animate-pulse-slow" />
          <div className="absolute w-60 h-60 rounded-full bg-cyan-500/15 blur-[90px]" />

          {/* Initials Badge */}
          <div className="relative mb-8 flex items-center justify-center">
            <motion.div
              className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[2px] shadow-glow-lg"
              initial={{ scale: 0.8, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="w-full h-full bg-[#0a0d16] rounded-2xl flex items-center justify-center">
                <span className="font-mono text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
                  MR
                </span>
              </div>
            </motion.div>

            {/* Orbiting particle */}
            <motion.div
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-glow-cyan"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>

          {/* Developer Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400 font-semibold mb-2">
              Java Full Stack Developer
            </h2>
            <p className="text-sm font-medium text-slate-300 tracking-wide">
              Megatheshwaran R
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-48 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <div className="font-mono text-xs text-slate-300 mt-2 font-medium">
            {Math.min(progress, 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
