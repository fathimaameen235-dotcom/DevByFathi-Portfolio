import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Award, BookOpen, X } from 'lucide-react';
import { learning, certificates, dbProjects } from '../../data/portfolioData';

function LearningCard({ item, i }) {
  const isCompleted = item.type === 'completed';
  const accent = item.color || '#22d3ee';
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${accent}08, transparent 60%)` }}/>
      <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl border"
            style={{ borderColor: `${accent}30`, background: `${accent}15` }}>{item.icon}</div>
          <div>
            <h3 className="text-white font-bold text-base leading-tight">{item.title}</h3>
            <p className="text-sm mt-0.5 font-medium" style={{ color: accent }}>{item.organization}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${isCompleted ? 'border-lime-400/30 bg-lime-400/10 text-lime-400' : ''}`}
          style={!isCompleted ? { borderColor: `${accent}30`, background: `${accent}12`, color: accent } : {}}>
          {isCompleted ? <><CheckCircle2 size={11}/> Done</> : <><Clock size={11}/> Active</>}
        </div>
      </div>
      <p className="relative z-10 text-xs text-gray-400 leading-5 mb-4">{item.description}</p>
      {!isCompleted && item.progress !== undefined && (
        <div className="relative z-10 mb-3">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs text-gray-600 uppercase tracking-wider">Progress</span>
            <span className="text-xs font-bold" style={{ color: accent }}>{item.progress}%</span>
          </div>
          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.progress}%` }}
              viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }}
              className="h-full rounded-full" style={{ background: `linear-gradient(90deg,${accent},${accent}80)` }}/>
          </div>
        </div>
      )}
      <div className="relative z-10 text-xs text-gray-600 mt-3">📅 {item.period}</div>
    </motion.div>
  );
}

function CertificateCard({ cert, i, onPreview }) {
  const TYPE_LABELS = { internship: 'Internship', course: 'Course', workshop: 'Workshop', achievement: 'Achievement' };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.07 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => onPreview(cert)}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 cursor-pointer"
      style={{
        boxShadow: `0 0 0 0 ${cert.color}00`,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Shine sweep */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}/>
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
        style={{ boxShadow: `inset 0 0 30px ${cert.color}15` }}/>
      <div className="relative z-10 flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border flex-shrink-0"
          style={{ borderColor: `${cert.color}30`, background: `${cert.color}15` }}>{cert.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-white font-semibold text-sm leading-tight">{cert.title}</h4>
            <span className="text-xs px-2 py-0.5 rounded-full border flex-shrink-0"
              style={{ borderColor: `${cert.color}30`, background: `${cert.color}12`, color: cert.color }}>
              {TYPE_LABELS[cert.type]}
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-1">{cert.issuer}</p>
          <p className="text-gray-600 text-xs mt-0.5">📅 {cert.date}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CertModal({ cert, onClose }) {
  if (!cert) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl border p-8 overflow-hidden"
          style={{ background: '#111', borderColor: `${cert.color}40` }}>
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg,${cert.color},transparent)` }}/>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition">
            <X size={18}/>
          </button>
          <div className="text-5xl mb-4">{cert.icon}</div>
          <h3 className="text-xl font-bold text-white mb-1">{cert.title}</h3>
          <p className="font-medium text-sm mb-1" style={{ color: cert.color }}>{cert.issuer}</p>
          <p className="text-gray-500 text-xs mb-4">📅 {cert.date}</p>
          <p className="text-gray-400 text-sm leading-6">{cert.description}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function DbProjectCard({ proj, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
          style={{ borderColor: `${proj.color}30`, background: `${proj.color}12` }}>{proj.icon}</div>
        <div>
          <h4 className="text-white font-semibold text-sm">{proj.name}</h4>
          <span className="text-xs" style={{ color: proj.color }}>{proj.tech}</span>
        </div>
      </div>
      <p className="text-gray-400 text-xs leading-5 mb-4">{proj.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {proj.schema.map(table => (
          <span key={table} className="text-xs px-2 py-0.5 rounded border border-white/8 bg-white/5 text-gray-400 font-mono">
            {table}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Learning() {
  const [previewCert, setPreviewCert] = useState(null);
  const completed = learning.filter(i => i.type === 'completed');
  const ongoing = learning.filter(i => i.type === 'ongoing');

  return (
    <section id="learning" className="relative overflow-hidden py-28 px-6">
      <div className="absolute top-10 right-0 w-80 h-80 bg-cyan-500/8 blur-3xl rounded-full pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/8 blur-3xl rounded-full pointer-events-none"/>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4 font-medium">Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span style={{ background: "linear-gradient(135deg,#22d3ee,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Learning
            </span>{' '}&amp; Growth
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-gray-400 text-sm leading-6">
            Constantly improving skills, exploring technologies, and building real-world experience.
          </p>
        </motion.div>

        {/* Completed */}
        <div className="mb-14">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="flex items-center gap-3 mb-7">
            <div className="w-9 h-9 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-lime-400"/>
            </div>
            <h3 className="text-xl font-bold text-white">Completed</h3>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {completed.map((item, i) => <LearningCard key={i} item={item} i={i}/>)}
          </div>
        </div>

        {/* Ongoing */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="flex items-center gap-3 mb-7">
            <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
              <Clock size={16} className="text-cyan-400"/>
            </div>
            <h3 className="text-xl font-bold text-white">Currently Learning</h3>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            {ongoing.map((item, i) => <LearningCard key={i} item={item} i={i + completed.length}/>)}
          </div>
        </div>

        {/* Certificates */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award size={18} className="text-yellow-400"/>
              <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm font-medium">Achievements</p>
            </div>
            <h3 className="text-2xl font-bold text-white">Certificates &amp; Workshops</h3>
            <p className="text-gray-500 text-xs mt-2">Click any card to preview details</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, i) => (
              <CertificateCard key={cert.id} cert={cert} i={i} onPreview={setPreviewCert}/>
            ))}
          </div>
        </div>

        {/* Database Projects */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen size={18} className="text-cyan-400"/>
              <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm font-medium">Database</p>
            </div>
            <h3 className="text-2xl font-bold text-white">Database Projects</h3>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {dbProjects.map((proj, i) => <DbProjectCard key={proj.id} proj={proj} i={i}/>)}
          </div>
        </div>
      </div>

      <CertModal cert={previewCert} onClose={() => setPreviewCert(null)}/>
    </section>
  );
}