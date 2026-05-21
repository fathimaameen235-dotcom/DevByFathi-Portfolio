import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Target, Code2, Briefcase, GraduationCap, Zap } from "lucide-react";
import { education, strengths, personalInfo } from "../../data/portfolioData";

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const [counters, setCounters] = useState({ exp: 0, projects: 0, learning: 0 });

  useEffect(() => {
    if (!inView) return;
    const targets = { exp: 1, projects: 5, learning: 4 };
    Object.entries(targets).forEach(([key, target]) => {
      let value = 0;
      const interval = setInterval(() => {
        value += 1;
        setCounters(prev => ({ ...prev, [key]: value }));
        if (value >= target) clearInterval(interval);
      }, 200);
    });
  }, [inView]);

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  });

  const stats = [
    { value: counters.exp, suffix: "+", label: "Years Exp.", color: "#f97316", icon: "⚡" },
    { value: counters.projects, suffix: "+", label: "Projects Built", color: "#22d3ee", icon: "🚀" },
    { value: counters.learning, suffix: "+", label: "Courses Done", color: "#a855f7", icon: "📚" },
  ];

  const highlights = [
    { icon: <Code2 size={16}/>, label: "Frontend Passion", text: "Crafting pixel-perfect, animated UIs with React & Tailwind CSS", color: "#22d3ee" },
    { icon: <Briefcase size={16}/>, label: "Internship Experience", text: "Built production React components at Euclid Technologies (2024)", color: "#f97316" },
    { icon: <Target size={16}/>, label: "Full Stack Journey", text: "Expanding into Java Spring Boot & MERN for complete app development", color: "#a855f7" },
    { icon: <Zap size={16}/>, label: "Career Goal", text: "Software Engineer building scalable products at innovative startups", color: "#f59e0b" },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden px-6 py-28">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 blur-3xl rounded-full pointer-events-none"/>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div {...fade()} className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-400 mb-3 font-medium">Background</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span style={{ background: "linear-gradient(135deg,#22d3ee,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>About</span>{" "}
            <span className="text-white">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left – Identity */}
          <div className="space-y-6">
            {/* Main intro card */}
            <motion.div {...fade(0.1)} className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg,#f97316,#22d3ee,#a855f7)" }}/>
              {/* Dev illustration — SVG placeholder */}
              <div className="flex items-start gap-5 mb-6">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border border-orange-500/20 bg-orange-500/10">
                    👩‍💻
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-lime-400 border-2 border-[#080808]"/>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{personalInfo.name}</h3>
                  <p className="text-orange-400 font-medium text-sm mt-0.5">{personalInfo.title}</p>
                  <p className="text-gray-500 flex items-center gap-1.5 text-xs mt-1.5">
                    <MapPin size={11}/>{personalInfo.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 leading-7 text-sm mb-6">{personalInfo.intro}</p>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-center">
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-2xl font-black tabular-nums" style={{ color: s.color }}>{s.value}{s.suffix}</div>
                    <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div {...fade(0.2)}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center">
                  <GraduationCap size={15} className="text-cyan-400"/>
                </div>
                <h4 className="text-white font-bold">Education</h4>
              </div>
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 hover:border-white/15 transition-colors"
                    style={{ borderLeft: `3px solid ${edu.color}` }}
                  >
                    <div className="text-2xl">{edu.icon}</div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{edu.degree}</p>
                      <p className="text-gray-400 text-xs">{edu.institution}</p>
                    </div>
                    <div>
                      <span className="text-xs px-2.5 py-1 rounded-full border"
                        style={{ borderColor: `${edu.color}30`, background: `${edu.color}12`, color: edu.color }}>
                        {edu.period}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right – Highlights + Strengths */}
          <div className="space-y-6">
            {/* Developer highlights */}
            <motion.div {...fade(0.15)} className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7">
              <h4 className="text-white font-bold mb-5 flex items-center gap-2">
                <span className="text-lg">✨</span> Developer Profile
              </h4>
              <div className="space-y-4">
                {highlights.map((h, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex gap-3 p-3 rounded-xl border border-white/5 hover:border-white/10 bg-white/[0.02] transition-all group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                      style={{ background: `${h.color}18`, border: `1px solid ${h.color}30`, color: h.color }}>
                      {h.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold" style={{ color: h.color }}>{h.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5 leading-5">{h.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Strengths */}
            <motion.div {...fade(0.25)} className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7">
              <h4 className="text-white font-bold mb-5">Core Strengths</h4>
              <div className="grid grid-cols-2 gap-3">
                {strengths.map((s, i) => (
                  <motion.div key={i}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-white/[0.03] hover:border-white/15 transition-all cursor-default"
                    style={{ borderLeft: `2px solid ${s.color}` }}
                  >
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-gray-300 text-xs font-medium">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Career goal card */}
            <motion.div {...fade(0.3)} className="relative rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-xl rounded-full"/>
              <div className="flex items-start gap-3 relative z-10">
                <Target size={18} className="text-purple-400 mt-0.5 flex-shrink-0"/>
                <div>
                  <p className="text-purple-300 text-xs font-semibold uppercase tracking-wider mb-1">Career Goal</p>
                  <p className="text-gray-300 text-sm leading-6">{personalInfo.careerGoal}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}