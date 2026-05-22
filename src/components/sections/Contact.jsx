import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

import {
  Send,
  Github,
  Linkedin,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import { personalInfo } from '../../data/portfolioData';

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#f97316',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'fathimaameen235-dotcom',
    href: personalInfo.github,
    color: '#ffffff',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Ali Fathima A',
    href: personalInfo.linkedin,
    color: '#0ea5e9',
  },
];

export default function Contact() {
  const formRef = useRef(null);

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const [fields, setFields] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const update = (e) => {
    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const send = async (e) => {
    e.preventDefault();

    if (
      !fields.name.trim() ||
      !fields.email.trim() ||
      !fields.subject.trim() ||
      !fields.message.trim()
    ) {
      setStatus('error');
      return;
    }

    setSending(true);
    setStatus(null);

    try {
      const response = await emailjs.send(
        'service_xspbc6s',
        'template_9pu59do',
        {
          from_name: fields.name,
          from_email: fields.email,
          subject: fields.subject,
          message: fields.message,
        },
        'FxyqVHaZ8zg61K6ec'
      );

      console.log('SUCCESS!', response);

      setStatus('success');

      setFields({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.log('FULL ERROR:', error);

      alert(error?.text || 'Email failed');

      setStatus('error');
    } finally {
      setSending(false);

      setTimeout(() => {
        setStatus(null);
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 px-6"
    >
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl bg-orange-500/10 pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl bg-cyan-500/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-orange-400 uppercase tracking-[0.25em] text-sm mb-4 font-medium">
            Get in Touch
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Let&apos;s{' '}
            <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto leading-7">
            Open to full-time roles, freelance projects,
            collaborations, and exciting frontend opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.45fr_0.55fr] gap-10 items-start">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            {/* Profile Card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 relative overflow-hidden">
              <img
                src="/robot.png"
                alt="robot"
                className="absolute right-0 bottom-0 w-40 opacity-10 pointer-events-none select-none"
              />

              <h3 className="text-2xl font-bold text-white mb-2 relative z-10">
                {personalInfo.name}
              </h3>

              <p className="text-orange-400 font-semibold mb-5 relative z-10">
                {personalInfo.title}
              </p>

              <p className="text-gray-400 leading-7 text-sm relative z-10">
                {personalInfo.summary}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 relative z-10">
                <MapPin
                  size={15}
                  className="text-orange-400"
                />
                {personalInfo.location}
              </div>
            </div>

            {/* Contact Cards */}
            {CONTACT_CARDS.map(
              ({
                icon: Icon,
                label,
                value,
                href,
                color,
              }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 transition-all duration-300 hover:border-white/20"
                >
                  <div
                    className="flex items-center justify-center h-12 w-12 rounded-2xl border"
                    style={{
                      borderColor: `${color}30`,
                      background: `${color}15`,
                      color,
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                      {label}
                    </p>

                    <p className="text-white font-medium truncate">
                      {value}
                    </p>
                  </div>
                </motion.a>
              )
            )}
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Send a Message
            </h3>

            <form
              ref={formRef}
              onSubmit={send}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={update}
                    required
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-orange-400 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={update}
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-orange-400 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={fields.subject}
                  onChange={update}
                  required
                  placeholder="Job opportunity / Collaboration"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-orange-400 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  rows={6}
                  value={fields.message}
                  onChange={update}
                  required
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-orange-400 transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-cyan-500 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
              >
                <Send
                  size={18}
                  className={
                    sending ? 'animate-pulse' : ''
                  }
                />

                {sending
                  ? 'Sending...'
                  : 'Send Message'}
              </button>
            </form>

            {/* STATUS */}
            <AnimatePresence>
              {status && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 12,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`mt-5 flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${status === 'success'
                      ? 'border-lime-500/30 bg-lime-500/10 text-lime-400'
                      : 'border-red-500/30 bg-red-500/10 text-red-400'
                    }`}
                >
                  {status === 'success' ? (
                    <>
                      <CheckCircle2 size={18} />
                      Message sent successfully!
                    </>
                  ) : (
                    <>
                      <AlertCircle size={18} />
                      Something went wrong. Please try again.
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}