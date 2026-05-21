import { ExternalLink, Mail, Heart } from 'lucide-react';
import { personalInfo } from "../../data/portfolioData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden border-t py-12 px-6"
      style={{
        borderColor: 'rgba(255,255,255,0.06)',
        background: '#0a0a0a',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="font-sora font-black text-xl tracking-wider select-none">
          <span className="grad-orange">Dev</span>
          <span className="text-white">By</span>
          <span className="grad-cyan">AF</span>
        </div>

        {/* Copy */}
        <p
          className="flex items-center gap-1.5 text-sm text-center"
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'DM Mono, monospace',
          }}
        >
          © {year} Ali Fathima · Built with
          <Heart
            size={13}
            className="text-orange-400"
            fill="currentColor"
          />
          React
        </p>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {[
            {
              icon: ExternalLink,
              href: personalInfo.github,
              label: 'GitHub',
              external: true,
            },
            {
              icon: ExternalLink,
              href: personalInfo.linkedin,
              label: 'LinkedIn',
              external: true,
            },
            {
              icon: Mail,
              href: `mailto:${personalInfo.email}`,
              label: 'Email',
              external: false,
            },
          ].map(({ icon: Icon, href, label, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external && {
                target: '_blank',
                rel: 'noreferrer',
              })}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/50 transition-all duration-300 hover:border-orange-400/40 hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}