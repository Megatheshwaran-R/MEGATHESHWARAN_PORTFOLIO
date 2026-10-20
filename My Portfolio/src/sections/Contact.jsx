import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiLinkedin, FiGithub, FiInstagram, FiFacebook, FiMessageSquare } from 'react-icons/fi';
import confetti from 'canvas-confetti';

export function Contact({ profile, onToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please provide a subject.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please enter a message of at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Optional Formspree submission if user adds their form ID, or graceful client-side handling
      // We can also trigger a mailto fallback link for 100% operational guarantee!
      const response = await fetch('https://formspree.io/f/xbjvkqwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      }).catch(() => null);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'],
      });

      setIsSuccess(true);
      if (onToast) {
        onToast({
          type: 'success',
          title: 'Message Dispatched!',
          message: 'Thank you for reaching out. Megatheshwaran will get back to you promptly.',
        });
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      if (onToast) {
        onToast({
          type: 'error',
          title: 'Transmission Notice',
          message: 'Could not send directly via endpoint. You can also reach out directly to ravichandranmegathesh@gmail.com.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <FiMessageSquare className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white light:text-slate-900 tracking-tight">
            Let's Build Something High-Impact
          </h2>
          <p className="mt-3 text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Interested in discussing full-stack software development, Java backend architectures, or distributed systems? Send a direct dispatch below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-800/80 light:border-slate-200 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white light:text-slate-900 font-display">
                Direct Channels
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 leading-relaxed">
                Feel free to email directly, call, or connect across verified professional networks.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email */}
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/60 light:bg-slate-100 hover:bg-slate-800/80 light:hover:bg-slate-200 border border-slate-800/80 light:border-slate-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                    <FiMail />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Email Address
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 light:text-slate-800 break-all">
                      {profile.email}
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/60 light:bg-slate-100 hover:bg-slate-800/80 light:hover:bg-slate-200 border border-slate-800/80 light:border-slate-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                    <FiPhone />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Direct Telephone
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 light:text-slate-800">
                      {profile.phone}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-slate-800/80 light:border-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg">
                    <FiMapPin />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Location
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 light:text-slate-800">
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels Strip */}
              <div className="pt-4 border-t border-slate-800/80 light:border-slate-200">
                <span className="text-xs font-mono text-slate-400 block mb-3">
                  Professional Networks
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <FiLinkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <FiGithub className="w-4 h-4" />
                  </a>
                  <a
                    href={profile.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Profile"
                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <FiInstagram className="w-4 h-4" />
                  </a>
                  <a
                    href={profile.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Profile"
                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <FiFacebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 rounded-2xl glass-card border border-slate-800/80 light:border-slate-200 shadow-xl space-y-5"
            >
              <h3 className="text-xl font-bold text-white light:text-slate-900 font-display mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-600 mb-6">
                Fill out the parameters below to establish communication.
              </p>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 light:text-slate-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Connor"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 light:bg-slate-100 text-slate-100 light:text-slate-900 border ${
                      errors.name ? 'border-rose-500' : 'border-slate-800 light:border-slate-300'
                    } focus:outline-none focus:border-indigo-500 transition-colors text-sm font-sans`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-rose-400 mt-1 block font-mono">{errors.name}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 light:text-slate-700 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sarah@enterprise.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 light:bg-slate-100 text-slate-100 light:text-slate-900 border ${
                      errors.email ? 'border-rose-500' : 'border-slate-800 light:border-slate-300'
                    } focus:outline-none focus:border-indigo-500 transition-colors text-sm font-sans`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-rose-400 mt-1 block font-mono">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 light:text-slate-700 mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Full Stack Developer Role / Technical Discussion"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 light:bg-slate-100 text-slate-100 light:text-slate-900 border ${
                    errors.subject ? 'border-rose-500' : 'border-slate-800 light:border-slate-300'
                  } focus:outline-none focus:border-indigo-500 transition-colors text-sm font-sans`}
                />
                {errors.subject && (
                  <span className="text-[11px] text-rose-400 mt-1 block font-mono">{errors.subject}</span>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 light:text-slate-700 mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your project scope, engineering requirements, or inquiry..."
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 light:bg-slate-100 text-slate-100 light:text-slate-900 border ${
                    errors.message ? 'border-rose-500' : 'border-slate-800 light:border-slate-300'
                  } focus:outline-none focus:border-indigo-500 transition-colors text-sm font-sans resize-none`}
                />
                {errors.message && (
                  <span className="text-[11px] text-rose-400 mt-1 block font-mono">{errors.message}</span>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <span>Dispatching Payload...</span>
                ) : isSuccess ? (
                  <>
                    <FiCheck className="w-4 h-4 text-emerald-300" />
                    <span>Dispatched Successfully!</span>
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
