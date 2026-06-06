import { config } from '@/data/ghoul.config';
import { Shield, FileCheck, Lock, Globe } from 'lucide-react';

export default function IPBadge() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#a855f7] text-xs font-bold tracking-[0.3em] uppercase mb-3 block">
            Intellectual Property
          </span>
          <h2 className="font-mono text-4xl md:text-5xl text-white mb-4">
            IP & Trademark Portfolio
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-lg">
            Character IP strategy in place. GOO GHOUL™ is trademarked in Australia. All ghouls are mapped to target trademark classes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Main IP Card */}
          <div className="glass-glow rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at top right, #a855f7, transparent 70%)' }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/30 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#a855f7]" />
                </div>
                <div>
                  <p className="font-mono text-sm text-white font-bold">{config.name}</p>
                  <p className="text-[#94a3b8] text-xs">Trademark Planned</p>
                </div>
              </div>
              <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">{config.ipStatus}</p>
              <div className="flex flex-col gap-2">
                {config.ipClasses.map((ipClass) => (
                  <div key={ipClass} className="flex items-center gap-2 text-[#a855f7] text-xs">
                    <FileCheck className="w-4 h-4 shrink-0" />
                    <span>{ipClass}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Protection Grid */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: Lock, title: 'Brand Lockup', desc: 'Logo, name, and character design mapped for trademark protection across target classes.', color: '#a855f7' },
              { icon: Globe, title: 'International Strategy', desc: 'US, UK, and EU trademark filings planned for Phase 3.', color: '#00f0ff' },
              { icon: Shield, title: 'Character IP', desc: 'Each ghoul is a distinct character with product-line, game, and merch potential.', color: '#f59e0b' },
            ].map((item) => (
              <div key={item.title} className="glass rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.color}15` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="font-mono text-sm text-white font-bold mb-1">{item.title}</p>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TM Certificates Strip */}
        <div className="glass rounded-xl p-6 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-[#94a3b8] text-xs">
            <FileCheck className="w-4 h-4 text-[#00ff41]" />
            <span>GOO GHOUL™ Filed</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-[#94a3b8] text-xs">
            <FileCheck className="w-4 h-4 text-[#00ff41]" />
            <span>GOO GHOUL™ Accepted</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-[#94a3b8] text-xs">
            <FileCheck className="w-4 h-4 text-[#00ff41]" />
            <span>12 Characters Defined</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-[#94a3b8] text-xs">
            <Shield className="w-4 h-4 text-[#a855f7]" />
            <span>11 TM Filings Planned</span>
          </div>
        </div>
      </div>
    </section>
  );
}
