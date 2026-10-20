import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[9999] max-w-md"
      >
        <div
          className={`flex items-start gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100'
              : 'bg-rose-950/90 border-rose-500/50 text-rose-100'
          }`}
        >
          {toast.type === 'success' ? (
            <FiCheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
          ) : (
            <FiAlertCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
          )}
          <div className="flex-1 pr-2">
            <h4 className="text-sm font-semibold">{toast.title}</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
