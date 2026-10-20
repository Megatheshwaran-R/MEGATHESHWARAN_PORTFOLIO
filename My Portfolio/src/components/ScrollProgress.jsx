import { useScrollProgress } from '../hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[9990] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 transition-all duration-100 ease-out shadow-glow"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
